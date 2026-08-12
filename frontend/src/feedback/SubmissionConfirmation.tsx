import { Modal, Button, AlertDialog } from "@bcgov/design-system-react-components";
import "@bcgov/bc-sans/css/BC_Sans.css";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    title: string;
}

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