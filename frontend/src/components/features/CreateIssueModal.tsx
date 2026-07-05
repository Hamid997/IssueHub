import Modal from "../base/Modal"
import IssueForm from "../features/IssueForm"

interface FormData {
    title: string;
    description: string;
    priority: string;
}

interface CreateIssueModalProps {
    isOpen: boolean
    onClose: () => void
    onSubmit: (data: FormData) => void;
}

export default function CreateIssueModal({isOpen, onClose,onSubmit}: CreateIssueModalProps) {
    return (
        <Modal
            title="Create Issue"
            isOpen={isOpen}
            onClose={onClose}
        >
            <IssueForm
                onSubmit={onSubmit}
            />
        </Modal>
    )
}