import { ButtonGroup, Button, Dialog, Select, Modal, Form, TextField, RadioGroup, Radio } from "@bcgov/design-system-react-components";

// 🟢 Update your frontend enum to use explicit string values
enum QuestionType {
  TEXTAREA = "TEXTAREA",
  RADIO = "RADIO",
  DROPDOWN = "DROPDOWN",
  BOOLEAN = "BOOLEAN",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  CHECKBOX = "CHECKBOX",
  NPS = "NPS"
}

// INTERFACES 
interface Option {
    id: number;
    optionText: string;
    optionValue: string;
    displayOrder: number;
}

interface Question {
    id: number;
    questionType: QuestionType;
    question_text: string;
    is_required: boolean;
    display_order: number;
    options?: Option[];
}

interface FormData {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}

interface FeedbackFormProps {
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
    forms: FormData[];
}

// COMPONENT
function FeedbackForm({ isFormOpen, setIsFormOpen, forms }: FeedbackFormProps) {
    // eventually home.tsx will be getting a from with a specific id 
    // so the data being passed in will just be for one form
    console.log("FeedbackForm open:", isFormOpen);
    console.log("Forms:", forms);

    const form = forms[0];

    console.log("Form:", form);

    if (!form) {
        console.log("No form found");
        return null;
    }

    if (!isFormOpen) {
        console.log("Form not open");
        return null;
    }

    //Happiness Slider info
    const [showHappinessSlider, setShowHappinessSlider] = useState(false);

    //Success message state 
    const [showSuccess, setShowSuccess] = useState(false);

    //Error modal state
    const [showError, setShowError] = useState(false);

    //Error message state
    const [errorMessage, setErrorMessage] =
    useState("");

    async function handleSubmit() {
    try {
        const response = await fetch(
            "http://localhost:3000/api/form",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    test: true
                })
            }
        );

        if (response.ok) {
            setShowSuccess(true);
        } else {
            setErrorMessage(
                `Server returned ${response.status}`
            );

            setShowError(true);
        }
    } catch (error) {
            setErrorMessage(
                "Unable to connect to server."
            );

            setShowError(true);
        }
    }

    return (
        <>
            <Modal
                isDismissable
                isOpen={isFormOpen}
                onOpenChange={setIsFormOpen}
            >
                <Dialog isCloseable
                aria-label="Feedback form dialog">
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
                            {/* Make more cases for other types of questions (slider) */}
                            {form.questions?.map((question) => {
                                switch (question.questionType) {
                                    case QuestionType.TEXTAREA:
                                        return (
                                            <TextField
                                                key={question.id}
                                                isRequired={question.is_required}
                                                label={question.question_text}
                                            />
                                        );

                                    case QuestionType.RADIO:
                                        return (
                                            <RadioGroup
                                                key={question.id}
                                                isRequired={question.is_required}
                                                label={question.question_text}
                                                orientation="horizontal"
                                            >
                                                {question.options?.map((option) => (
                                                    <Radio
                                                        key={option.id}
                                                        value={option.optionValue}
                                                    >
                                                        {option.optionText}
                                                    </Radio>
                                                ))}
                                            </RadioGroup>
                                        );

                                    case QuestionType.DROPDOWN:
                                        return (
                                            <Select
                                                key={question.id}
                                                isRequired={question.is_required}
                                                label={question.question_text}
                                                items={
                                                    question.options?.map((option) => ({
                                                        id: option.optionValue,
                                                        label: option.optionText
                                                    })) || []
                                                }
                                            />
                                        );

                                    default:
                                        return null;
                                }
                            })}

                            <ButtonGroup alignment="start" orientation="horizontal">
                                <Button variant="primary" onPress={handleSubmit}>
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
            <SuccessModal
                isOpen={showSuccess}
                onClose={() => {
                    setShowSuccess(false);
                    setIsFormOpen(false);
                }}
            />

            <ErrorModal
                isOpen={showError}
                message={errorMessage}
                onClose={() => setShowError(false)}
            />
        </>
    );
}

export default FeedbackForm;