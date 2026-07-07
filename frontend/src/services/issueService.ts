import api from "../api/api";
import type { IssueResponse } from "../types/Issue";

interface IssueData {
    title: string;
    description: string;
    priority: string;
}

const issueService = {
    async getAll(): Promise<IssueResponse[]> {
        const response = await api.get("issues/");
        return response.data;
    },
    async create(data: IssueData) {
        const response = await api.post("issues/", data);
        return response.data;
    },
    async update(id: string, data: IssueData) {
        const response = await api.put(`issues/${id}`, data);
        return response.data;
    },
    async delete(id: string) {
        await api.delete(`issues/${id}`);
    },
}

export default issueService;