import { TextField, Checkbox, Select } from "@bcgov/design-system-react-components";
import type { FeedbackFormData, Question } from "../../feedback/types/feedback";
import { QuestionType } from "../../feedback/types/feedback";
import OptionEditor from "./OptionEditor";
import { requiresOptions } from "./questionUtils";

interface Props {
    question: Question;
    setForm: React.Dispatch<React.SetStateAction<FeedbackFormData>>;
}

function QuestionEditor({
    question,
    setForm
}: Props) {

    const updateQuestion = (
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
    };

    const deleteQuestion = () => {
        setForm((prev) => ({
            ...prev,
            questions: prev.questions.filter(
                (q) => q.id !== question.id
            )
        }));
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

            <button
                onClick={deleteQuestion}
                style={{
                    marginTop: "1rem"
                }}
            >
                Delete Question
            </button>
        </div>
    );
}

export default QuestionEditor;