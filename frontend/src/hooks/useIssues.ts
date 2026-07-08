import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import type {
    IssueResponse,
    IssueListResponse,
} from "../types/Issue";

import issueService from "../services/issueService";
import { getErrorMessage } from "../utils/errorHandler";

interface IssueData {
    title: string;
    description: string;
    priority: string;
}

export default function useIssues() {

    const [issues, setIssues] = useState<IssueResponse[]>([]);

    const [total, setTotal] = useState(0);

    const [skip, setSkip] = useState(0);

    const [limit, setLimit] = useState(10);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [initialized, setInitialized] = useState(false);

    useEffect(() => {

        loadIssues(skip, limit);

    }, []);

    async function loadIssues(currentSkip = skip, currentLimit = limit) {
        try {
            setLoading(true);
            setError("");
            const data: IssueListResponse = await issueService.getAll(currentSkip, currentLimit);
            setIssues(data.items);
            setTotal(data.total);
            setSkip(data.skip);
            setLimit(data.limit);
        } catch (error) {
            const message = getErrorMessage(error);
            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
            setInitialized(true);
        }
    }

    async function nextPage() {

        const nextSkip = skip + limit;

        if (nextSkip >= total) return;

        await loadIssues(nextSkip, limit);

    }

    async function previousPage() {

        const previousSkip = Math.max(skip - limit, 0);

        await loadIssues(previousSkip, limit);

    }
    async function createIssue(data: IssueData) {

        try {

            setLoading(true);
            setError("");

            const createdIssue = await issueService.create(data);

            setIssues((prev) => [...prev, createdIssue]);

            setTotal((prev) => prev + 1);

            toast.success("Issue created successfully");

        } catch (error) {

            const message = getErrorMessage(error);

            setError(message);

            toast.error(message);

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

            toast.success("Issue updated successfully");

        } catch (error) {

            const message = getErrorMessage(error);

            setError(message);

            toast.error(message);

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

            setTotal((prev) => Math.max(prev - 1, 0));

            toast.success("Issue deleted successfully");

        } catch (error) {

            const message = getErrorMessage(error);

            setError(message);

            toast.error(message);

            throw error;

        } finally {

            setLoading(false);

        }

    }

    return {
        issues,
        total,
        skip,
        limit,
        loading,
        error,
        initialized,
        nextPage,
        previousPage,
        loadIssues,
        createIssue,
        updateIssue,
        deleteIssue,
    };

}