import { Modal, Dialog, Button, AlertDialog } from "@bcgov/design-system-react-components";
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
            <AlertDialog
                buttons={[
                    <Button key="alert-dialog-button-1" variant="secondary" onPress={onClose}>Close</Button>,
                ]}
                isCloseable
                role="dialog"
                title={title}
                variant="confirmation"
                >
                {message}

            </AlertDialog>
        </Modal>
    );
}

export default SubmissionConfirmationModal;