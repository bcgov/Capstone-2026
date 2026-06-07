import { Button, Modal, Dialog } from "@bcgov/design-system-react-components";
import '@bcgov/bc-sans/css/BC_Sans.css';

interface Props {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    onAccept: () => void;
}

function FeedbackPrompt({ isOpen, setIsOpen, onAccept }: Props) {
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
            <Dialog
                isCloseable
                aria-label="Feedback prompt"
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
                        Would you like to tell us about your experience?
                    </h2>

                    <p
                        style={{
                            fontFamily: "BC Sans",
                            margin: 0,
                            fontSize: "0.95rem",
                            color: "#333"
                        }}
                    >
                        Your feedback helps us improve the application.
                    </p>

                    <div
                        style={{
                            display: "flex",
                            gap: "0.5rem",
                            justifyContent: "flex-end"
                        }}
                    >
                        <Button
                            onPress={() => {
                                setIsOpen(false);
                                onAccept();
                            }}
                        >
                            Yes
                        </Button>

                        <Button
                            variant="secondary"
                            onPress={() => setIsOpen(false)}
                        >
                            No
                        </Button>
                    </div>
                </div>
            </Dialog>
        </Modal>
    );
}

export default FeedbackPrompt;