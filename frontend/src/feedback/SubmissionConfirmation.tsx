import { Modal, Dialog, Button } from "@bcgov/design-system-react-components";
import "@bcgov/bc-sans/css/BC_Sans.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    title: string;
}

const styles = {
    container: {
        padding: "1.5rem",
        fontFamily: "BC Sans",
        display: "flex",
        flexDirection: "column" as const,
        gap: "1rem",
        minWidth: "320px",
    },
    heading: {
        fontSize: "1.25rem",
        fontWeight: 700,
        margin: 0,
    },
    body: {
        fontSize: "0.95rem",
        margin: 0,
        whiteSpace: "pre-line" as const,
    },
    actions: {
        display: "flex",
        justifyContent: "flex-end",
    },
};

function SubmissionConfirmationModal({ isOpen, onClose, message, title }: Props) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} isDismissable>
            <Dialog isCloseable aria-label={title}>
                <div style={styles.container}>
                    <h2 style={styles.heading}>{title}</h2>
                    <p style={styles.body}>{message}</p>
                    <div style={styles.actions}>
                        <Button onPress={onClose}>Close</Button>
                    </div>
                </div>
            </Dialog>
        </Modal>
    );
}

export default SubmissionConfirmationModal;