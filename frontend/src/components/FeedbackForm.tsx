import { ButtonGroup, Button, Dialog, Select, Modal, Form, TextField, RadioGroup, Radio } from "@bcgov/design-system-react-components";
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import HappinessSlider from "./HappinessSlider";
import { useState } from "react";
import type { FeedbackFormProps } from '../types/feedback';
import { QuestionType } from "../types/feedback";

function FeedbackForm({ isFormOpen, setIsFormOpen, formData }: FeedbackFormProps) {
    if (!formData) return null;
    if (!isFormOpen) return null;

    const [answers, setAnswers] = useState<Record<number, any>>({});
    //Happiness Slider info
    const [happiness, setHappiness] = useState(3);

    //Success message state 
    const [showSuccess, setShowSuccess] = useState(false);

    //Error modal state
    const [showError, setShowError] = useState(false);

    //Error message state
    const [errorMessage, setErrorMessage] =
        useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formattedAnswers = Object.entries(answers).map(
            ([questionId, value]) => ({
                questionId: Number(questionId),

                answerText:
                    typeof value === "string" ? value : null,

                answerBoolean:
                    typeof value === "boolean" ? value : null,

                answerNumber:
                    typeof value === "number" ? value : null,

                answerJson: null
            })
        );

        const payload = {
            formId: formData.id,
            session_id: null,
            anonymous_id: null,
            page_url: window.location.href,
            answers: formattedAnswers
        };
        try {
            const response = await fetch(
                "http://localhost:3000/api/submissions",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(payload)
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log("Submission created:", data);
                setAnswers({});
                setIsFormOpen(false);
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
    };

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
                            onSubmit={handleSubmit}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.5rem'
                            }}
                        >
                            {/* Make more cases for other types of questions (slider) */}
                            {formData.questions?.map((question) => {
                                switch (question.questionType) {
                                    case QuestionType.TEXTAREA:
                                        return (
                                            <TextField
                                                key={question.id}
                                                isRequired={question.is_required}
                                                label={question.question_text}
                                                onChange={(value) =>
                                                    setAnswers(prev => ({
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
                                                isRequired={question.is_required}
                                                label={question.question_text}
                                                orientation="horizontal"
                                                onChange={(value) =>
                                                    setAnswers(prev => ({
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
                                                isRequired={question.is_required}
                                                label={question.question_text}
                                                items={
                                                    question.options?.map((option) => ({
                                                        id: option.optionValue,
                                                        label: option.optionText
                                                    })) || []
                                                }
                                                onChange={(value) =>
                                                    setAnswers(prev => ({
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
                            {/* temp comment out 
                            <HappinessSlider>
                                value={happiness}
                                onChange={setHappiness}
                            </HappinessSlider>
                            */}
                            <ButtonGroup alignment="start" orientation="horizontal">
                                <Button variant="primary" type="submit">
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