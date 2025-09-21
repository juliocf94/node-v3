// src/utils/advancedPaginator.js
import pool from "@config/db.js";
import { QueryBuilder } from "./queryBuilder.js";
import { FilterEngine } from "./filterEngine.js";

/**
 * Advanced Paginator with enhanced features
 */
export class AdvancedPaginator {
  constructor(config = {}) {
    this.table = config.table || '';
    this.selectFields = config.selectFields || ['*'];
    this.joins = config.joins || [];
    this.groupBy = config.groupBy || [];
    this.timeZone = config.timeZone || process.env.TIME_ZONE;
    this.filterEngine = new FilterEngine();
    
    // Setup global filters if provided
    if (config.globalFilters) {
      config.globalFilters.forEach(filter => {
        this.filterEngine.addGlobalFilter(
          filter.key, 
          filter.column, 
          filter.type, 
          filter.defaultValue
        );
      });
    }
    
    // Setup filter config if provided
    if (config.filters) {
      config.filters.forEach(filter => {
        this.filterEngine.addFilter(filter.key, filter.column, filter.type, filter.options);
      });
    }
  }

  async paginate(params = {}) {
    const {
      filters = {},
      search = '',
      searchColumns = [],
      searchType = 'any',
      page = 1,
      perPage = 10,
      sortBy,
      sortOrder = 'ASC',
      having = [],
      aggregations = {},
      exportCSV = false,
      includeMetadata = false
    } = params;

    let conn;
    
    try {
      conn = await pool.getConnection();
      
      // Set timezone if needed
      if (this.timeZone) {
        await conn.query('SET time_zone = ?', [this.timeZone]);
      }

      // Build base query
      const queryBuilder = new QueryBuilder()
        .select(this._buildSelectFields(aggregations))
        .from(this.table);

      // Add joins
      this.joins.forEach(join => {
        queryBuilder.join(join.type, join.table, join.alias, join.on);
      });

      // Apply filters
      this.filterEngine.applyFilters(queryBuilder, filters);

      // Apply smart search
      if (search && searchColumns.length > 0) {
        this.filterEngine.applySmartSearch(queryBuilder, search, searchColumns, searchType);
      }

      // Add GROUP BY
      if (this.groupBy.length > 0) {
        queryBuilder.groupBy(this.groupBy);
      }

      // Apply HAVING clauses
      having.forEach(h => {
        queryBuilder.having(h.condition, h.params || []);
      });

      // Get total count
      const total = await this._getTotal(conn, queryBuilder);

      // Add sorting and pagination for main query
      if (sortBy) {
        queryBuilder.orderBy(sortBy, sortOrder);
      }

      if (!exportCSV) {
        const offset = (Number(page) - 1) * Number(perPage);
        queryBuilder.limit(Number(perPage)).offset(offset);
      }

      // Execute main query
      const { sql, params: queryParams } = queryBuilder.build();
      const data = await conn.query(sql, queryParams);

      // Sanitize bigints
      const sanitizedData = this._sanitizeBigInts(data);

      // Calculate pagination metadata
      const currentPage = Number(page);
      const perPageNum = Number(perPage);
      const totalPages = Math.ceil(total / perPageNum);
      
      const result = {
        data: sanitizedData,
        pagination: {
          total,
          page: currentPage,
          perPage: perPageNum,
          totalPages,
          hasNext: currentPage < totalPages,
          hasPrev: currentPage > 1
        }
      };

      if (includeMetadata) {
        result.metadata = {
          query: sql,
          params: queryParams,
          executionTime: Date.now(),
          filters: Object.keys(filters).length,
          searchApplied: !!search
        };
      }

      return result;

    } catch (error) {
      console.error('Advanced Paginator error:', error);
      throw error;
    } finally {
      conn?.release();
    }
  }

  _buildSelectFields(aggregations = {}) {
    let fields = [...this.selectFields];
    
    Object.entries(aggregations).forEach(([alias, config]) => {
      const { func, column, distinct = false } = config;
      const distinctKeyword = distinct ? 'DISTINCT ' : '';
      fields.push(`${func.toUpperCase()}(${distinctKeyword}${column}) as ${alias}`);
    });
    
    return fields;
  }

  async _getTotal(conn, queryBuilder) {
    const countBuilder = new QueryBuilder()
      .from(queryBuilder.fromTable);

    countBuilder.joins = [...queryBuilder.joins];
    countBuilder.whereConditions = [...queryBuilder.whereConditions];
    countBuilder.params = [...queryBuilder.params];

    if (this.groupBy.length > 0) {
      countBuilder
        .select(`COUNT(DISTINCT ${this.groupBy[0]}) as total`)
        .groupBy([]);
    } else {
      countBuilder.select('COUNT(*) as total');
    }

    const { sql, params } = countBuilder.build();
    const result = await conn.query(sql, params);
    
    const rawTotal = result[0]?.total ?? 0;
    return typeof rawTotal === 'bigint' ? Number(rawTotal) : rawTotal;
  }

  _sanitizeBigInts(data) {
    return data.map(row => {
      const sanitized = { ...row };
      Object.keys(sanitized).forEach(key => {
        if (typeof sanitized[key] === 'bigint') {
          sanitized[key] = Number(sanitized[key]);
        }
      });
      return sanitized;
    });
  }

  addFilter(key, column, type, options = {}) {
    this.filterEngine.addFilter(key, column, type, options);
    return this;
  }

  addGlobalFilter(key, column, type, defaultValue) {
    this.filterEngine.addGlobalFilter(key, column, type, defaultValue);
    return this;
  }
}

/**
 * Factory function for quick paginator creation
 */
export function createPaginator(config) {
  return new AdvancedPaginator(config);
}

/**
 * Legacy function for backward compatibility
 */
export async function paginate(options) {
  const paginator = new AdvancedPaginator({
    table: options.table,
    selectFields: options.selectFields,
    joins: options.joins,
    groupBy: options.groupBy,
    globalFilters: options.globalFilters,
    filters: options.filterConfig
  });
  
  return await paginator.paginate(options.params);
}