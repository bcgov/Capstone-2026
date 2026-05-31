import {
    Modal,
    Dialog,
    Button
} from "@bcgov/design-system-react-components";

interface ErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    message: string;
}

function ErrorModal({
    isOpen,
    onClose,
    message
}: ErrorModalProps) {
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
                    <h2>Something went wrong</h2>

                    <p>{message}</p>

                    <Button
                        variant="primary"
                        onPress={onClose}
                    >
                        Close
                    </Button>
                </div>
            </Dialog>
        </Modal>
    );
}

export default ErrorModal;