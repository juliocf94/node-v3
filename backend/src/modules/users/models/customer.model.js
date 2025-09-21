import pool from "@config/db.js";
import { createPaginator, AdvancedPaginator } from '@utils/advancedPaginator.js';

// Use prepared queries to avoid SQL injection
export const findAllActive = async (params = {}) => {
    try {
        const paginator = createPaginator({
            table: 'users u',
            selectFields: ['u.id', 'u.first_name', 'u.email', 'u.created_at'],
            filters: [
                { key: 'state', column: 'u.state', type: 'in' },
                { key: 'name', column: 'u.first_name', type: 'like' },
                { key: 'created_date', column: 'u.created_at', type: 'dateRange' }
            ]
        });

        const result = await paginator.paginate({
            filters: {
                state: ['0', '1'],
                ...params.filters
            },
            page: params.page || 1,
            perPage: params.perPage || 20,
            sortBy: params.sortBy || 'u.created_at',
            sortOrder: params.sortOrder || 'DESC',
            search: params.search || '',
            searchColumns: ['u.first_name', 'u.email']
        });

        console.log('Active users result:', result);
        return result;

    } catch (error) {
        console.error('Error in findAllActive:', error);
        throw error;
    }
};