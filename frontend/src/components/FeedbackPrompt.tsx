import {
    Button,
    Dialog,
    Modal
} from "@bcgov/design-system-react-components";

interface FeedbackPromptProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onAccept: () => void;
}

function FeedbackPrompt({
    isOpen,
    setIsOpen,
    onAccept
}: FeedbackPromptProps) {
    return (
        <Modal
            isOpen={isOpen}
            onOpenChange={setIsOpen}
            isDismissable
            style={{
                position: "absolute",
                bottom: "1rem",
                right: "1rem"
            }}
        >
            <Dialog isCloseable aria-label="Feedback form prompt dialog">
                <div style={{ padding: "1rem" }}>
                    <h2 style={{ fontFamily: "BC Sans" }}>
                        Would you like to tell us about your experience?
                    </h2>

                    <Button
                        onPress={() => {
                            setIsOpen(false);
                            onAccept();
                        }}
                        style={{ margin: "5px" }}
                    >
                        Yes
                    </Button>

                    <Button
                        variant="secondary"
                        onPress={() => setIsOpen(false)}
                        style={{ margin: "5px" }}
                    >
                        No
                    </Button>
                </div>
            </Dialog>
        </Modal>
    );
}

export default FeedbackPrompt;