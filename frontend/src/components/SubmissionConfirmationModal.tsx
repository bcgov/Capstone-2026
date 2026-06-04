import {
    Modal,
    Dialog,
    Button
} from "@bcgov/design-system-react-components";

interface SubmissionConfirmationProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    title: string;
}

function SubmissionConfirmationModal({
    isOpen,
    onClose,
    message,
    title
}: SubmissionConfirmationProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            isDismissable
        >
            <Dialog
                isCloseable
                aria-label="Submission failed"
            >
                <div style={{ padding: "1rem" }}>
                    <h2>{title}</h2>
                    <p>{message}</p>
                    <Button variant="primary" onPress={onClose}>
                        Close
                    </Button>
                </div>
            </Dialog>
        </Modal>
    );
}

export default SubmissionConfirmationModal;