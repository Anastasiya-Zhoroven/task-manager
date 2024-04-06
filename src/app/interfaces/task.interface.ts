export interface Task {
    id: number
    project_id: number
    due_date: number
    status: string
    assignees: number[]
    title: string
    description: string
}
