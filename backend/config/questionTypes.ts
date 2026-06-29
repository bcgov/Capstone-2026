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

    [QuestionType.CHECKBOX]: {
        supportsOptions: true,
        answerField: 'answerJson'
    },

    [QuestionType.SLIDER]: {
        supportsOptions: false,
        answerField: 'answerNumber',
    },
};