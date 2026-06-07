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
import SubmissionConfirmationModal from "./SubmissionConfirmationModal";

function FeedbackForm({
    isFormOpen,
    setIsFormOpen,
    formData,
    apiBaseUrl,
    onSuccess
}: FeedbackFormProps) {
    const [answers, setAnswers] = useState<Record<number, unknown>>({});
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [confirmationTitle, setConfirmationTitle] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const initialAnswers: Record<number, unknown> = {};

        formData.questions.forEach((q) => {
            if (q.questionType === QuestionType.SLIDER) {
                initialAnswers[q.id] = q.defaultAnswer ?? 3;
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
        <Modal isDismissable isOpen={isFormOpen} onOpenChange={setIsFormOpen}>
            <Dialog isCloseable aria-label="Feedback form">
                <div style={{ padding: "1rem" }}>
                    <h2>Tell us about your experience</h2>

                    <Form onSubmit={handleSubmit}>
                        {formData.questions.map((q: Question) => {
                            switch (q.questionType) {
                                case QuestionType.TEXTAREA:
                                    return (
                                        <TextField
                                            key={q.id}
                                            label={q.question_text}
                                            isRequired={q.is_required}
                                            onChange={(v) =>
                                                setAnswers((p) => ({ ...p, [q.id]: v }))
                                            }
                                        />
                                    );

                                case QuestionType.RADIO:
                                    return (
                                        <RadioGroup
                                            key={q.id}
                                            label={q.question_text}
                                            onChange={(v) =>
                                                setAnswers((p) => ({ ...p, [q.id]: v }))
                                            }
                                        >
                                            {q.options?.map((o) => (
                                                <Radio key={o.id} value={o.optionValue}>
                                                    {o.optionText}
                                                </Radio>
                                            ))}
                                        </RadioGroup>
                                    );

                                case QuestionType.DROPDOWN:
                                    return (
                                        <Select
                                            key={q.id}
                                            label={q.question_text}
                                            items={
                                                q.options?.map((o) => ({
                                                    id: o.optionValue,
                                                    label: o.optionText
                                                })) || []
                                            }
                                            onChange={(v) =>
                                                setAnswers((p) => ({ ...p, [q.id]: v }))
                                            }
                                        />
                                    );

                                case QuestionType.SLIDER:
                                    return (
                                        <HappinessSlider
                                            key={q.id}
                                            value={answers[q.id] ?? q.defaultAnswer ?? 3}
                                            onChange={(v) =>
                                                setAnswers((p) => ({ ...p, [q.id]: v }))
                                            }
                                        />
                                    );

                                default:
                                    return null;
                            }
                        })}

                        <ButtonGroup>
                            <Button type="submit">Submit</Button>
                            <Button
                                type="button"
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