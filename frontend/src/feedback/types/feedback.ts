export enum QuestionType {
    TEXTAREA = "TEXTAREA",
    RADIO = "RADIO",
    DROPDOWN = "DROPDOWN",
    CHECKBOX = "CHECKBOX",
    SLIDER = "SLIDER",
}

export const QUESTION_TYPE_LABELS: Record<QuestionType, string> = {
    [QuestionType.TEXTAREA]: "Textarea",
    [QuestionType.RADIO]: "Radio Button",
    [QuestionType.DROPDOWN]: "Dropdown Menu",
    [QuestionType.CHECKBOX]: "Checkbox",
    [QuestionType.SLIDER]: "Slider",
};

export type FormattedAnswer = {
    questionId: number;
    answerText: string | null;
    answerBoolean: boolean | null;
    answerNumber: number | null;
    answerJson: any;
};

export type DefaultAnswerMap = {
    [QuestionType.SLIDER]: number;
    [QuestionType.TEXTAREA]: string;
    [QuestionType.RADIO]: string;
    [QuestionType.DROPDOWN]: string;
    [QuestionType.CHECKBOX]: string[];
};

export type DefaultAnswer<T extends QuestionType> = DefaultAnswerMap[T];

export interface Option {
    id: number;
    optionText: string;
    optionValue: string;
    displayOrder: number;
}

export interface Question<T extends QuestionType = QuestionType> {
    id: number;
    questionType: T;
    question_text: string;
    defaultAnswer?: DefaultAnswer<T> | null;
    is_required: boolean;
    display_order: number;
    options?: Option[];
}

export interface FeedbackFormData {
    id: number;
    name: string;
    description: string;
    questions: Question[];
}

export interface FeedbackFormProps {
    isFormOpen: boolean;
    setIsFormOpen: (open: boolean) => void;
    formData: FeedbackFormData;

    apiBaseUrl: string;
    onSuccess?: (submissionId: number) => void;
}