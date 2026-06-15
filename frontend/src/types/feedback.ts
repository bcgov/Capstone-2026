export type QuestionType =
    "TEXTAREA"
"RADIO"
"DROPDOWN"
"BOOLEAN"
"MULTIPLE_CHOICE"
"CHECKBOX"
"NPS"
"SLIDER";

export interface QuestionOption {
    optionText: string;
    optionValue: string;
    displayOrder: number;
}

export interface Question {
    questionType: QuestionType;
    question_text: string;
    is_required: boolean;
    display_order: number;
    metadata?: Record<string, unknown>;
    options?: QuestionOption[];
}

export interface FeedbackForm {
    name: string;
    description?: string;
    is_active?: boolean;
    version?: number;
    questions: Question[];
}