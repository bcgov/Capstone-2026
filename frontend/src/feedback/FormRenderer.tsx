import { Select, TextField, RadioGroup, Radio, CheckboxGroup, Checkbox } from "@bcgov/design-system-react-components";
import HappinessSlider from "./HappinessSlider";
import { QuestionType } from "./types/feedback";
import type { FeedbackFormData, Question } from "./types/feedback";

interface Props {
    formData: FeedbackFormData;
    answers: Record<number, any>;
    setAnswers: React.Dispatch<React.SetStateAction<Record<number, any>>>;
}

function FormRenderer({ formData, answers, setAnswers }: Props) {
    const setAnswer = (id: number, value: any) =>
        setAnswers((prev) => ({ ...prev, [id]: value }));

    return (
        <>
            {formData.questions.map((question: Question) => {
                const { id, question_text, is_required, options } = question;

                switch (question.questionType) {
                    case QuestionType.TEXTAREA:
                        return (
                            <TextField
                                key={id}
                                label={question_text}
                                isRequired={is_required}
                                onChange={(value) => setAnswer(id, value)}
                            />
                        );

                    case QuestionType.RADIO:
                        return (
                            <RadioGroup
                                key={id}
                                label={question_text}
                                isRequired={is_required}
                                orientation="vertical"
                                onChange={(value) => setAnswer(id, value)}
                            >
                                {options?.map((option) => (
                                    <Radio key={option.id} value={option.optionValue}>
                                        {option.optionText}
                                    </Radio>
                                ))}
                            </RadioGroup>
                        );

                    case QuestionType.DROPDOWN:
                        return (
                            <Select
                                key={id}
                                label={question_text}
                                isRequired={is_required}
                                items={options?.map((o) => ({ id: o.optionValue, label: o.optionText })) || []}
                                onChange={(value) => setAnswer(id, value)}
                            />
                        );

                    case QuestionType.SLIDER:
                        return (
                            <HappinessSlider
                                key={id}
                                question={question_text}
                                value={answers[id] ?? question.defaultAnswer ?? 3}
                                onChange={(value) => setAnswer(id, value)}
                            />
                        );

                    case QuestionType.CHECKBOX:
                        return (
                            <CheckboxGroup
                                key={id}
                                label={question_text}
                                isRequired={is_required}
                                orientation="vertical"
                                onChange={(value) => setAnswer(id, value)}
                            >
                                {options?.map((option) => (
                                    <Checkbox key={option.id} value={option.optionValue}>
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