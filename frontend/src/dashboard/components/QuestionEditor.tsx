import { TextField, Checkbox, Select, Button } from "@bcgov/design-system-react-components";
import type { FeedbackFormData, Question } from "../../feedback/types/feedback";
import { QuestionType } from "../../feedback/types/feedback";
import OptionEditor from "./OptionEditor";
import { requiresOptions } from "./questionUtils";

interface Props {
    question: Question;
    setForm: React.Dispatch<React.SetStateAction<FeedbackFormData>>;
    form: FeedbackFormData;
}

function QuestionEditor({
    question,
    setForm,
    form
}: Props) {

    const updateQuestion = async (
        field: keyof Question,
        value: any
    ) => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.map((q) =>
                q.id === question.id
                    ? {
                        ...q,
                        [field]: value
                    }
                    : q
            )
        }));
        await fetch(`/api/form/${form.id}/${question.id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                [field]: value,
            })
        });
    };

    const moveQuestionUp = async () => {
        setForm((prev) => {
            const currentIndex = prev.questions.findIndex(
                (q) => q.id === question.id
            );

            if (currentIndex === 0) return prev;

            const questions = [...prev.questions];

            [questions[currentIndex - 1], questions[currentIndex]] = [
                questions[currentIndex],
                questions[currentIndex - 1]
            ];

            return {
                ...prev,
                questions: questions.map((q, index) => ({
                    ...q,
                    display_order: index + 1
                }))
            };
        });

        await fetch(`/api/form/${form.id}/${question.id}/order`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newOrder: question.display_order - 1,
            })
        });
    };

    const moveQuestionDown = async () => {
        setForm((prev) => {
            const currentIndex = prev.questions.findIndex(
                (q) => q.id === question.id
            );

            if (currentIndex === prev.questions.length - 1) {
                return prev;
            }

            const questions = [...prev.questions];

            [questions[currentIndex], questions[currentIndex + 1]] = [
                questions[currentIndex + 1],
                questions[currentIndex]
            ];

            return {
                ...prev,
                questions: questions.map((q, index) => ({
                    ...q,
                    display_order: index + 1
                }))
            };
        });

        await fetch(`/api/form/${form.id}/${question.id}/order`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                newOrder: question.display_order + 1,
            })
        });
    };

    const deleteQuestion = async () => {
        setForm((prev) => {
            const questions = prev.questions
                .filter((q) => q.id !== question.id)
                .map((q, index) => ({
                    ...q,
                    display_order: index + 1
                }));

            return {
                ...prev,
                questions
            };
        });

        await fetch(`/api/form/${form.id}/${question.id}`, {
            method: "DELETE",
        });
    };

    return (
        <div
            style={{
                border: "1px solid #ddd",
                padding: "1rem",
                marginBottom: "1rem",
                borderRadius: "4px",
                fontFamily: "BC Sans"
            }}
        >
            <TextField
                label="Question Text"
                value={question.question_text}
                onChange={(value) =>
                    updateQuestion(
                        "question_text",
                        value
                    )
                }
            />

            <Select
                label="Question Type"
                selectedKey={question.questionType}
                items={Object.values(QuestionType).map(
                    (type) => ({
                        id: type,
                        label: type
                    })
                )}
                onChange={(value) =>
                    updateQuestion(
                        "questionType",
                        value
                    )
                }
            />

            {requiresOptions(question.questionType) && (
                <OptionEditor
                    question={question}
                    setForm={setForm}
                />
            )}

            <Checkbox
                isSelected={question.is_required}
                onChange={(value) =>
                    updateQuestion(
                        "is_required",
                        value
                    )
                }
            >
                Required
            </Checkbox>

            <div
                style={{
                    display: "flex",
                    gap: "0.5rem",
                    marginTop: "1rem"
                }}
            >
                <Button
                    onPress={moveQuestionUp}
                    isDisabled={question.display_order === 1}
                >
                    ↑ Move Up
                </Button>

                <Button
                    onPress={moveQuestionDown}
                    isDisabled={question.display_order === form.questions.length}
                >
                    ↓ Move Down
                </Button>

                <Button
                    onPress={deleteQuestion}
                >
                    Delete
                </Button>
            </div>
        </div>
    );
}

export default QuestionEditor;