import {
    ButtonGroup,
    Button,
    Dialog,
    Modal,
    Form
} from "@bcgov/design-system-react-components";
import FormRenderer from "./FormRenderer";
import { useEffect, useState } from "react";
import type { FormattedAnswer, FeedbackFormProps } from "./types/feedback";
import { QuestionType } from "./types/feedback";
import SubmissionConfirmationModal from "./SubmissionConfirmation";
import { useAuth } from "../auth/AuthContext";


function FeedbackForm({
    isFormOpen,
    setIsFormOpen,
    formData,
    apiBaseUrl,
    onSuccess
}: FeedbackFormProps) {
    if (!formData) return null;

    const [answers, setAnswers] = useState<Record<number, any>>({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const { userId } = useAuth();


    useEffect(() => {
        const initialAnswers: Record<number, any> = {};

        formData.questions.forEach((question) => {
            if (question.questionType === QuestionType.SLIDER) {
                initialAnswers[question.id] = question.defaultAnswer ?? 3;
            }
        });

        setAnswers(initialAnswers);
    }, [formData]);

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
        if (isSuccess) setIsFormOpen(false);
    };

    if (!isFormOpen) {
        return (
            <SubmissionConfirmationModal
                isOpen={showConfirmation}
                message={confirmationMessage}
                onClose={handleCloseConfirmation}
                title={confirmationTitle}
            />
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formattedAnswers: FormattedAnswer[] = Object.entries(answers).flatMap(
            ([questionId, value]): FormattedAnswer[] => {

                if (Array.isArray(value)) {
                    return value.map((val): FormattedAnswer => ({
                        questionId: Number(questionId),
                        answerText: val,
                        answerBoolean: null,
                        answerNumber: null,
                        answerJson: null
                    }));
                }

                return [
                    {
                        questionId: Number(questionId),
                        answerText: typeof value === "string" ? value : null,
                        answerBoolean: typeof value === "boolean" ? value : null,
                        answerNumber: typeof value === "number" ? value : null,
                        answerJson: null
                    }
                ];
            }
        );
        try {
            const response = await fetch(`${apiBaseUrl}/api/submissions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    formId: formData.id,
                    page_url: window.location.href,
                    answers: formattedAnswers
                })
            });

            const data = await response.json();

            if (response.ok) {
                setIsSuccess(true);
                setConfirmationTitle("Successful Feedback Submission!");
                setConfirmationMessage(`Submission ID: ${data.id}`);
                setShowConfirmation(true);
                setIsFormOpen(false);

                onSuccess?.(data.id);
            } else {
                setIsSuccess(false);
                setConfirmationTitle("Unsuccessful Submission");
                setConfirmationMessage(`Server returned ${response.status}`);
                setShowConfirmation(true);
            }
        } catch {
            setIsSuccess(false);
            setConfirmationTitle("Unsuccessful Submission");
            setConfirmationMessage("Unable to connect to server.");
            setShowConfirmation(true);
        }
    };

    return (
        <Modal
            isDismissable
            isOpen={isFormOpen}
            onOpenChange={setIsFormOpen}
        >
            <Dialog
                isCloseable
                aria-label="Feedback form dialog"
            >
                <div style={{
                    padding: "1.5rem",
                    fontFamily: "BC Sans",
                    maxHeight: "80vh",
                    overflowY: "auto",
                    overflowX: "hidden"
                }}>
                    <span
                        style={{ font: "700 1.25rem/2.125rem 'BC Sans'" }}
                    >
                        Tell us about your experience!
                    </span>

                    <Form
                        onSubmit={handleSubmit}
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "0.75rem",
                            marginTop: "1rem",
                            fontFamily: "BC Sans"
                        }}
                    >
                        <FormRenderer
                            formData={formData}
                            answers={answers}
                            setAnswers={setAnswers}
                        />

                        <ButtonGroup>
                            <Button type="submit" variant="primary">
                                Submit
                            </Button>

                            <Button
                                type="reset"
                                variant="secondary"
                                onPress={() => setAnswers({})}
                            >
                                Reset
                            </Button>
                        </ButtonGroup>
                    </Form>
                </div>
            </Dialog>
        </Modal>
    );
}

export default FeedbackForm;