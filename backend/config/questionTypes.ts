// config/questionTypes.ts

import { QuestionType } from '@prisma/client';

export const QUESTION_CONFIG = {
    [QuestionType.TEXTAREA]: {
        component: 'TextInput',
        supportsOptions: false,
        answerField: 'answerText'
    },

    [QuestionType.RADIO]: {
        supportsOptions: true,
        answerField: 'answerText'
    },

    [QuestionType.DROPDOWN]: {
        supportsOptions: true,
        answerField: 'answerText'
    },

    [QuestionType.BOOLEAN]: {
        supportsOptions: false,
        answerField: 'answerBoolean'
    },

    [QuestionType.MULTIPLE_CHOICE]: {
        supportsOptions: true,
        answerField: 'answerJson'
    },

    [QuestionType.CHECKBOX]: {
        supportsOptions: true,
        answerField: 'answerJson'
    },

    [QuestionType.NPS]: {
        supportsOptions: false,
        min: 1,
        max: 10,
    },

    [QuestionType.SLIDER]: {
        supportsOptions: false,
        answerField: 'answerNumber',
    },
};