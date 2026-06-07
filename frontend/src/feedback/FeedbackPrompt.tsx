import { Button, Modal, Dialog } from "@bcgov/design-system-react-components";

interface Props {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onAccept: () => void;
}

function FeedbackPrompt({ isOpen, setIsOpen, onAccept }: Props) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={(open) => !open && setIsOpen(false)}
            isDismissable
        >
            <Dialog isCloseable aria-label="Feedback prompt">
                <div style={{ padding: "1rem" }}>
                    <h2>Would you like to give feedback?</h2>

                    <Button onPress={() => { setIsOpen(false); onAccept(); }}>
                        Yes
                    </Button>

                    <Button variant="secondary" onPress={() => setIsOpen(false)}>
                        No
                    </Button>
                </div>
            </Dialog>
        </Modal>
    );
}

export default FeedbackPrompt;