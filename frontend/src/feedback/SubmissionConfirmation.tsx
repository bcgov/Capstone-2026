import { Modal, Button, AlertDialog } from "@bcgov/design-system-react-components";
import "@bcgov/bc-sans/css/BC_Sans.css";
import { useState } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    message: string;
    title: string;
    variant: string;
}

function SubmissionConfirmationModal({ isOpen, onClose, message, title, variant }: Props) {
    const [isError, setIsError] = useState(false);

    if (variant == "error") {
        setIsError(true);
    }

    return (
        <Modal isOpen={isOpen} onOpenChange={onClose} isDismissable>
            {isError ?
                <AlertDialog
                    buttons={[
                        <Button key="alert-dialog-button-1" variant="secondary" onPress={onClose}>Close</Button>,
                    ]}
                    isCloseable
                    role="dialog"
                    title={title}
                    variant={"error"}
                >
                    {message}

                </AlertDialog>
                : <AlertDialog
                    buttons={[
                        <Button key="alert-dialog-button-1" variant="secondary" onPress={onClose}>Close</Button>,
                    ]}
                    isCloseable
                    role="dialog"
                    title={title}
                    variant={"confirmation"}
                >
                    {message}

                </AlertDialog>
            }
        </Modal>
    );
}

export default SubmissionConfirmationModal;