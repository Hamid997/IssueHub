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
    }) => void;
}

export default function EditIssueModal({ issue, isOpen, onClose, onSubmit }: EditIssueModalProps) {
    return (
        <Modal
            title="Edit Issue"
            isOpen={isOpen}
            onClose={onClose}
        >

            <IssueForm
                issue={issue}
                onSubmit={onSubmit}
            />

        </Modal>
    )
}