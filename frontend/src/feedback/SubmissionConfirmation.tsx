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
                aria-label={title}
            >
                <div
                    style={{
                        padding: "1.5rem",
                        fontFamily: "BC Sans",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        minWidth: "320px"
                    }}
                >
                    <h2
                        style={{
                            fontFamily: "BC Sans",
                            fontSize: "1.25rem",
                            fontWeight: 700,
                            margin: 0
                        }}
                    >
                        {title}
                    </h2>

                    <p
                        style={{
                            fontFamily: "BC Sans",
                            fontSize: "0.95rem",
                            margin: 0,
                            whiteSpace: 'pre-line'
                        }}
                    >
                        {message}
                    </p>

                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button onPress={onClose}>
                            Close
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Modal>
    );
}

export default SubmissionConfirmationModal;