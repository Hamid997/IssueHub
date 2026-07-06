import { useEffect, useState } from "react";
import type { IssueResponse } from "../types/Issue";
import issueService from "../services/issueService";

interface IssueData {
    title: string;
    description: string;
    priority: string;
}

export default function useIssues() {
    const [issues, setIssues] = useState<IssueResponse[]>([]);

    useEffect(() => {
        async function loadIssues() {
            const data = await issueService.getAll();
            setIssues(data);
        }

        loadIssues();
    }, []);

    async function createIssue(data: IssueData) {
        const createdIssue = await issueService.create(data);


        setIssues((prev) => [...prev, createdIssue]);
    }

    async function deleteIssue(id: string) {
        await issueService.delete(id);

        setIssues((prev) =>
            prev.filter((issue) => issue.id !== id)
        );
    }

    async function updateIssue(id: string, data: IssueData) {
        const updated = await issueService.update(id, data);

        setIssues((prev) =>
            prev.map((issue) =>
                issue.id === id ? updated : issue
            )
        );
    }

    return {
        issues,
        createIssue,
        updateIssue,
        deleteIssue,
    };
}