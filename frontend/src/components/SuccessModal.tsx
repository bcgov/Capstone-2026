import {
    Modal,
    Dialog,
    Button
} from "@bcgov/design-system-react-components";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

function SuccessModal({
    isOpen,
    onClose
}: SuccessModalProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={onClose}
            isDismissable
        >
            <Dialog
                isCloseable
                aria-label="Submission successful"
            >
                <div style={{ padding: "1rem" }}>
                    <h2>Thank you!</h2>

                    <p>
                        Your feedback was submitted successfully.
                    </p>

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

export default SuccessModal;