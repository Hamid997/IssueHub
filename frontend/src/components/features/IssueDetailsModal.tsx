import Modal from "../base/Modal";
import Card from "../base/Card";
import Badge from "../base/Badge";

import type { IssueResponse } from "../../types/Issue"

interface IssueDetailsModalProps {
    issue: IssueResponse
    isOpen: boolean
    onClose: () => void
}

export default function IssueDetailsModal({issue,isOpen,onClose}: IssueDetailsModalProps) {
    return(
        <Modal
            title="Issue Details"
            isOpen={isOpen}
            onClose={onClose}
        >
            <Card>
                <h2>{issue.title}</h2>
                <p>{issue.description}</p>
                <Badge>{issue.status}</Badge>
            </Card>
        </Modal>
    )
}