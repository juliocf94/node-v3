// src/utils/queryBuilder.js
/**
 * Advanced Query Builder for complex database operations
 */
export class QueryBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.selectFields = [];
        this.fromTable = '';
        this.joins = [];
        this.whereConditions = [];
        this.groupByFields = [];
        this.havingConditions = [];
        this.orderByFields = [];
        this.limitValue = null;
        this.offsetValue = null;
        this.params = [];
        return this;
    }

    select(fields) {
        this.selectFields = Array.isArray(fields) ? fields : [fields];
        return this;
    }

    from(table) {
        this.fromTable = table;
        return this;
    }

    join(type, table, alias, condition) {
        this.joins.push({ type: type.toUpperCase(), table, alias, condition });
        return this;
    }

    where(condition, params = []) {
        this.whereConditions.push(condition);
        this.params.push(...params);
        return this;
    }

    groupBy(fields) {
        this.groupByFields = Array.isArray(fields) ? fields : [fields];
        return this;
    }

    having(condition, params = []) {
        this.havingConditions.push(condition);
        this.params.push(...params);
        return this;
    }

    orderBy(field, direction = 'ASC') {
        this.orderByFields.push(`${field} ${direction.toUpperCase()}`);
        return this;
    }

    limit(count) {
        this.limitValue = count;
        return this;
    }

    offset(count) {
        this.offsetValue = count;
        return this;
    }

    build() {
        let sql = `SELECT ${this.selectFields.join(', ')}`;
        sql += ` FROM ${this.fromTable}`;

        // Add JOINs
        for (const join of this.joins) {
            sql += ` ${join.type} JOIN ${join.table} ${join.alias} ON ${join.condition}`;
        }

        // Add WHERE
        if (this.whereConditions.length > 0) {
            sql += ` WHERE ${this.whereConditions.join(' AND ')}`;
        }

        // Add GROUP BY
        if (this.groupByFields.length > 0) {
            sql += ` GROUP BY ${this.groupByFields.join(', ')}`;
        }

        // Add HAVING
        if (this.havingConditions.length > 0) {
            sql += ` HAVING ${this.havingConditions.join(' AND ')}`;
        }

        // Add ORDER BY
        if (this.orderByFields.length > 0) {
            sql += ` ORDER BY ${this.orderByFields.join(', ')}`;
        }

        // Add LIMIT and OFFSET
        if (this.limitValue !== null) {
            sql += ` LIMIT ${this.limitValue}`;
        }
        if (this.offsetValue !== null) {
            sql += ` OFFSET ${this.offsetValue}`;
        }

        return {
            sql: sql.trim(),
            params: this.params
        };
    }
}