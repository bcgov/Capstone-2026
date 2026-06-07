import { Modal, Dialog, Button } from "@bcgov/design-system-react-components";
import '@bcgov/bc-sans/css/BC_Sans.css';

interface Props {
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
}: Props) {
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
                    <h2 style={{ fontFamily: "BC Sans" }}>{title}</h2>
                    <p style={{ fontFamily: "BC Sans" }}>{message}</p>
                    <Button variant="primary" onPress={onClose}>
                        Close
                    </Button>
                </div>
            </Dialog>
        </Modal>
    );
}

export default SubmissionConfirmationModal;