import {
    ButtonGroup,
    Button,
    Dialog,
    Modal,
    Form,
    TextField,
    RadioGroup,
    Radio,
    Select
} from "@bcgov/design-system-react-components";

import { useEffect, useState } from "react";
import type { FeedbackFormProps, Question } from "./types/feedback";
import { QuestionType } from "./types/feedback";

import HappinessSlider from "./HappinessSlider";
import SubmissionConfirmationModal from "./SubmissionConfirmation";

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

        const formattedAnswers = Object.entries(answers).map(
            ([questionId, value]) => ({
                questionId: Number(questionId),
                answerText: typeof value === "string" ? value : null,
                answerBoolean: typeof value === "boolean" ? value : null,
                answerNumber: typeof value === "number" ? value : null,
                answerJson: null
            })
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
                <div style={{ padding: "1.5rem", fontFamily: "BC Sans" }}>
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
                        {formData.questions.map((question: Question) => {
                            switch (question.questionType) {
                                case QuestionType.TEXTAREA:
                                    return (
                                        <TextField
                                            key={question.id}
                                            label={question.question_text}
                                            isRequired={question.is_required}
                                            onChange={(value) =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    [question.id]: value
                                                }))
                                            }
                                        />
                                    );

                                case QuestionType.RADIO:
                                    return (
                                        <RadioGroup
                                            key={question.id}
                                            label={question.question_text}
                                            orientation="horizontal"
                                            onChange={(value) =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    [question.id]: value
                                                }))
                                            }
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
                                            label={question.question_text}
                                            items={
                                                question.options?.map((option) => ({
                                                    id: option.optionValue,
                                                    label: option.optionText
                                                })) || []
                                            }
                                            onChange={(value) =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    [question.id]: value
                                                }))
                                            }
                                        />
                                    );

                                case QuestionType.SLIDER:
                                    return (
                                        <HappinessSlider
                                            key={question.id}
                                            question={question.question_text}
                                            value={
                                                answers[question.id] ??
                                                question.defaultAnswer ??
                                                3
                                            }
                                            onChange={(value) =>
                                                setAnswers((prev) => ({
                                                    ...prev,
                                                    [question.id]: value
                                                }))
                                            }
                                        />
                                    );

                                default:
                                    return null;
                            }
                        })}

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