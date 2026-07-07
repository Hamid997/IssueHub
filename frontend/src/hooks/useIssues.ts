import { useEffect, useState } from "react";

import type { IssueResponse } from "../types/Issue";
import issueService from "../services/issueService";
import { getErrorMessage } from "../utils/errorHandler";

interface IssueData {
    title: string;
    description: string;
    priority: string;
}

export default function useIssues() {
    const [issues, setIssues] = useState<IssueResponse[]>([]);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    useEffect(() => {
        async function loadIssues() {
            try {
                setLoading(true);
                setError("");

                const data = await issueService.getAll();
                setIssues(data);
            } catch (error) {
                setError(getErrorMessage(error));
            } finally {
                setLoading(false);
            }
        }

        loadIssues();
    }, []);

    async function createIssue(data: IssueData) {
        try {
            setLoading(true);
            setError("");

            const createdIssue = await issueService.create(data);

            setIssues((prev) => [...prev, createdIssue]);
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function deleteIssue(id: string) {
        try {
            setLoading(true);
            setError("");

            await issueService.delete(id);

            setIssues((prev) =>
                prev.filter((issue) => issue.id !== id)
            );
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }

    async function updateIssue(id: string, data: IssueData) {
        try {
            setLoading(true);
            setError("");

            const updated = await issueService.update(id, data);

            setIssues((prev) =>
                prev.map((issue) =>
                    issue.id === id ? updated : issue
                )
            );
        } catch (error) {
            setError(getErrorMessage(error));
            throw error;
        } finally {
            setLoading(false);
        }
    }

    return {
        issues,
        loading,
        error,
        createIssue,
        updateIssue,
        deleteIssue,
    };
}