import { QuestionType } from "../../feedback/types/feedback";

export function requiresOptions(type: QuestionType) {
  return [
    QuestionType.RADIO,
    QuestionType.DROPDOWN,
    QuestionType.MULTIPLE_CHOICE,
    QuestionType.CHECKBOX
  ].includes(type);
}