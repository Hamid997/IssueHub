import Modal from "../base/Modal";
import Button from "../base/Button";

interface ConfirmDialogProps {
    isOpen: boolean;
    title: string;
    message: string;

    onCancel: () => void;
    onConfirm: () => void;
}
export default function ConfirmDialog({
    isOpen,
    title,
    message,
    onCancel,
    onConfirm,
}: ConfirmDialogProps) {
        return (
        <Modal
            title={title}
            isOpen={isOpen}
            onClose={onCancel}
        >
            <p>{message}</p>

            <div className="dialog-actions">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={onCancel}
                >
                    Cancel
                </Button>

                <Button
                    type="button"
                    variant="danger"
                    onClick={onConfirm}
                >
                    Delete
                </Button>
            </div>
        </Modal>
    );


}