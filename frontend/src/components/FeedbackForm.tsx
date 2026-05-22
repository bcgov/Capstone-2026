import { ButtonGroup, Button, Dialog, Select, Modal, Form, TextField, RadioGroup, Radio } from "@bcgov/design-system-react-components";

interface FeedbackFormProps {
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
}

function FeedbackForm({ isFormOpen, setIsFormOpen }: FeedbackFormProps) {
    if (!isFormOpen) return null;

    return (
        <>
            <Modal
                isDismissable
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
            >
                <Dialog isCloseable>
                    <div
                        style={{ padding: '1rem' }}
                    >
                        <span
                            style={{ font: '700 1.25rem/2.125rem \'BC Sans\'' }}
                        >
                            Tell us about your experience!
                        </span>
                        <Form
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            <TextField
                                isRequired
                                label="What color showed up when you clicked the button?"
                            />

                            <RadioGroup
                                isRequired
                                label="Does the color affect the visibility of the other content on the page?"
                                orientation="horizontal"
                            >
                                <Radio value="yes">
                                    Yes
                                </Radio>
                                <Radio value="no">
                                    No
                                </Radio>
                            </RadioGroup>

                            <Select isRequired
                                items={[
                                    {
                                        id: 'chilliwack',
                                        label: 'Chilliwack'
                                    },
                                    {
                                        id: 'kelowna',
                                        label: 'Kelowna'
                                    },
                                    {
                                        id: 'kamloops',
                                        label: 'Kamloops'
                                    },
                                    {
                                        id: 'nanaimo',
                                        label: 'Nanaimo'
                                    },
                                    {
                                        id: 'princegeorge',
                                        label: 'Prince George'
                                    },
                                    {
                                        id: 'vancouver',
                                        label: 'Vancouver'
                                    },
                                    {
                                        id: 'victoria',
                                        label: 'Victoria'
                                    }
                                ]}
                                label="City"
                            />

                            <ButtonGroup alignment="start" orientation="horizontal">
                                <Button type="submit" variant="primary">
                                    Submit
                                </Button>
                                <Button type="reset" variant="secondary">
                                    Reset
                                </Button>
                            </ButtonGroup>
                        </Form>
                    </div>
                </Dialog>
            </Modal>
        </>
    );
}

export default FeedbackForm;