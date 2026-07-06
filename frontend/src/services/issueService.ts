import axios from "axios";
import type { IssueResponse } from "../types/Issue";

interface IssueData {
    title: string;
    description: string;
    priority: string;
}

const API_URL = "http://localhost:8000/issues";

const issueService = {
    async getAll(): Promise<IssueResponse[]> {
        const response = await axios.get(API_URL);
        return response.data;
    },
    async create(data: IssueData) {
        const response = await axios.post(API_URL, data);
        return response.data;
    },
    async update(id: string, data: IssueData) {
        const response = await axios.put(`${API_URL}/${id}`, data);
        return response.data;
    },
    async delete(id: string) {
        await axios.delete(`${API_URL}/${id}`);
    },
}

export default issueService;