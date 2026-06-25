export enum QuestionType {
    TEXTAREA = "Textarea",
    RADIO = "Radio button",
    DROPDOWN = "Dropdown menu",
    MULTIPLE_CHOICE = "Multiple choice",
    CHECKBOX = "Checkbox",
    SLIDER = "Slider",
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
    [QuestionType.BOOLEAN]: boolean;
    [QuestionType.MULTIPLE_CHOICE]: string[];
    [QuestionType.CHECKBOX]: string[];
    [QuestionType.NPS]: number;
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