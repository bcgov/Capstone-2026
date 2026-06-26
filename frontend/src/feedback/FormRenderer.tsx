import { Select, TextField, RadioGroup, Radio, CheckboxGroup, Checkbox } from "@bcgov/design-system-react-components";
import HappinessSlider from "./HappinessSlider";
import { QuestionType } from "./types/feedback";
import type { FeedbackFormData, Question } from "./types/feedback";

interface Props {
    formData: FeedbackFormData;
    answers: Record<number, any>;
    setAnswers: React.Dispatch<
        React.SetStateAction<Record<number, any>>
    >;
}

function FormRenderer({
    formData,
    answers,
    setAnswers
}: Props) {
    return (
        <>
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
                                isRequired={question.is_required}
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
                                isRequired={question.is_required}
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
                    case QuestionType.CHECKBOX:
                        return (
                            <CheckboxGroup
                                key={question.id}
                                label={question.question_text}
                                isRequired={question.is_required}
                                orientation="horizontal"
                                onChange={(checkedValue) =>
                                    setAnswers((prev) => ({
                                        ...prev,
                                        [question.id]: checkedValue
                                    }))
                                }
                            >
                                {question.options?.map((option) => (
                                    <Checkbox
                                        key={option.id}
                                        value={option.optionValue}
                                    >
                                        {option.optionText}
                                    </Checkbox>
                                ))}
                            </CheckboxGroup>
                        );
                    default:
                        return null;
                }
            })}
        </>
    );
}

export default FormRenderer;