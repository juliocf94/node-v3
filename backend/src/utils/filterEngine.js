// src/utils/filterEngine.js
/**
 * Advanced Filter Engine with smart search capabilities
 */
export class FilterEngine {
  constructor() {
    this.globalFilters = [];
    this.filterConfig = [];
  }

  /**
   * Add global filters (applied to all queries)
   */
  addGlobalFilter(key, column, type, defaultValue = null) {
    this.globalFilters.push({ key, column, type, defaultValue });
    return this;
  }

  /**
   * Add specific filter configuration
   */
  addFilter(key, column, type, options = {}) {
    this.filterConfig.push({ key, column, type, ...options });
    return this;
  }

  /**
   * Process filters and apply to query builder
   */
  applyFilters(queryBuilder, filters = {}) {
    // Apply global filters defaults
    this.globalFilters.forEach(({ key, defaultValue }) => {
      if (this._isEmpty(filters[key])) {
        filters[key] = Array.isArray(defaultValue) ? defaultValue : [defaultValue];
      }
    });

    // Combine all filter configurations
    const allFilters = [...this.globalFilters, ...this.filterConfig];

    // Process each filter
    allFilters.forEach(config => {
      const value = filters[config.key];
      if (!this._isEmpty(value)) {
        this._applyFilter(queryBuilder, config, value);
      }
    });

    return queryBuilder;
  }

  /**
   * Smart search across multiple columns (YouTube-style)
   */
  applySmartSearch(queryBuilder, searchTerm, searchColumns, searchType = 'any') {
    if (!searchTerm || !searchColumns?.length) return queryBuilder;

    const terms = searchTerm.trim().split(/\s+/);
    const conditions = [];
    const params = [];

    if (searchType === 'all') {
      // All terms must match (AND logic)
      terms.forEach(term => {
        const termConditions = searchColumns.map(col => `${col} REGEXP ?`);
        conditions.push(`(${termConditions.join(' OR ')})`);
        params.push(...Array(searchColumns.length).fill(this._escapeRegex(term)));
      });
      if (conditions.length > 0) {
        queryBuilder.where(`(${conditions.join(' AND ')})`, params);
      }
    } else {
      // Any term can match (OR logic) - default
      const termConditions = [];
      terms.forEach(term => {
        searchColumns.forEach(col => {
          termConditions.push(`${col} REGEXP ?`);
          params.push(this._escapeRegex(term));
        });
      });
      if (termConditions.length > 0) {
        queryBuilder.where(`(${termConditions.join(' OR ')})`, params);
      }
    }

    return queryBuilder;
  }

  /**
   * Apply individual filter based on type
   */
  _applyFilter(queryBuilder, config, value) {
    const { column, type } = config;

    switch (type) {
      case 'like':
        queryBuilder.where(`${column} LIKE ?`, [`%${value}%`]);
        break;

      case 'exact':
      case '=':
        queryBuilder.where(`${column} = ?`, [value]);
        break;

      case '!=':
        queryBuilder.where(`${column} != ?`, [value]);
        break;

      case '>=':
        queryBuilder.where(`${column} >= ?`, [value]);
        break;

      case '<=':
        queryBuilder.where(`${column} <= ?`, [value]);
        break;

      case 'in':
        const inVals = Array.isArray(value) ? value : [value];
        if (inVals.length > 0) {
          const placeholders = inVals.map(() => '?').join(', ');
          queryBuilder.where(`${column} IN (${placeholders})`, inVals);
        }
        break;

      case 'notIn':
        const notInVals = Array.isArray(value) ? value : [value];
        if (notInVals.length > 0) {
          const placeholders = notInVals.map(() => '?').join(', ');
          queryBuilder.where(`${column} NOT IN (${placeholders})`, notInVals);
        }
        break;

      case 'between':
        const { min, max } = value;
        if (min != null && max != null) {
          queryBuilder.where(`${column} BETWEEN ? AND ?`, [min, max]);
        } else if (min != null) {
          queryBuilder.where(`${column} >= ?`, [min]);
        } else if (max != null) {
          queryBuilder.where(`${column} <= ?`, [max]);
        }
        break;

      case 'dateRange':
        const { startDate, endDate } = value;
        if (startDate && endDate) {
          queryBuilder.where(`${column} BETWEEN ? AND ?`, [
            new Date(startDate).toISOString(),
            new Date(endDate).toISOString()
          ]);
        }
        break;

      case 'regex':
        const pattern = this._escapeRegex(value);
        if (Array.isArray(column)) {
          const conditions = column.map(() => `? REGEXP ?`);
          queryBuilder.where(`(${conditions.join(' OR ')})`,
            column.flatMap(col => [col, pattern])
          );
        } else {
          queryBuilder.where(`${column} REGEXP ?`, [pattern]);
        }
        break;

      case 'null':
        queryBuilder.where(`${column} IS NULL`);
        break;

      case 'notNull':
        queryBuilder.where(`${column} IS NOT NULL`);
        break;
    }
  }

  _isEmpty(value) {
    return value == null ||
      value === '' ||
      (Array.isArray(value) && value.length === 0);
  }

  _escapeRegex(str) {
    return String(str).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
}