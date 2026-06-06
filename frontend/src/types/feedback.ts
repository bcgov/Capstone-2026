export type DefaultAnswerType = {
    [QuestionType.SLIDER]: number;
    [QuestionType.TEXTAREA]: string;
    [QuestionType.RADIO]: string;
    [QuestionType.DROPDOWN]: string;
    [QuestionType.BOOLEAN]: boolean;
    [QuestionType.MULTIPLE_CHOICE]: string[];
    [QuestionType.CHECKBOX]: string[];
    [QuestionType.NPS]: number;
};


export enum QuestionType {
    TEXTAREA = "TEXTAREA",
    RADIO = "RADIO",
    DROPDOWN = "DROPDOWN",
    BOOLEAN = "BOOLEAN",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    CHECKBOX = "CHECKBOX",
    NPS = "NPS",
    SLIDER = "SLIDER",
}

export interface Option {
    id: number;
    optionText: string;
    optionValue: string;
    displayOrder: number;
}

export interface Question {
    id: number;
    questionType: QuestionType;
    question_text: string;
    defaultAnswer?: DefaultAnswerType[QuestionType] | null;
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
}