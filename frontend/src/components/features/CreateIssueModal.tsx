import Modal from "../base/Modal"
import IssueForm from "../features/IssueForm"

interface FormData {
    title: string;
    description: string;
    priority: string;
    status?: string;
}

interface CreateIssueModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: FormData) => void;
    loading: boolean;
    // error: string;
}

export default function CreateIssueModal({ loading, isOpen, onClose, onSubmit }: CreateIssueModalProps) {
    return (
        <Modal
            title="Create Issue"
            isOpen={isOpen}
            onClose={onClose}
        >
            <IssueForm
                loading={loading}
                // error={error}
                onSubmit={onSubmit}
                onCancel={onClose}
            />
        </Modal>
    )
}