export interface TaskFilters {
    assignees?: number[];
    dueDate?: {
        start: number,
        end: number,
    };
    orderBy?: string;
    sortBy?: string;
}
