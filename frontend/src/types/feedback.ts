export enum QuestionType {
    TEXTAREA = "TEXTAREA",
    RADIO = "RADIO",
    DROPDOWN = "DROPDOWN",
    BOOLEAN = "BOOLEAN",
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
    CHECKBOX = "CHECKBOX",
    NPS = "NPS"
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