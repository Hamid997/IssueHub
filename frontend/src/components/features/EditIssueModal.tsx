import Modal from "../base/Modal"
import IssueForm from "../features/IssueForm"
import type { IssueResponse } from "../../types/Issue"

interface EditIssueModalProps {
    issue: IssueResponse
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: {
        title: string;
        description: string;
        priority: string;
        status?: string;
    }) => void;
    loading: boolean;
    // error: string;
}

export default function EditIssueModal({ loading, issue, isOpen, onClose, onSubmit }: EditIssueModalProps) {
    return (
        <Modal
            title="Edit Issue"
            isOpen={isOpen}
            onClose={onClose}
        >

            <IssueForm
                issue={issue}
                showStatus
                loading={loading}
                // error={error}
                onSubmit={onSubmit}
                onCancel={onClose}
            />

        </Modal>
    )
}