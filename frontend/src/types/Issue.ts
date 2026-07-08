export interface IssueResponse {
    id: string
    title: string
    description: string | null
    status: "open" | "closed" | "in_progress"
    priority: "high" | "medium" | "low"
    date_added: string
    date_completed: string | null
}

export interface IssueCreate {
    title: string
    description: string | null
    priority: "high" | "medium" | "low"
}

export interface IssueUpdate {
    title?: string
    description?: string | null
    status?: "open" | "closed" | "in_progress"
    priority?: "high" | "medium" | "low"
}

export interface IssueListResponse{
    items:IssueResponse[];
    total:number;
    skip:number;
    limit:number;
}