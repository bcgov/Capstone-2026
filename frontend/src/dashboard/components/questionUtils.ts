import { QuestionType } from "../../feedback/types/feedback";

export function requiresOptions(type: QuestionType) {
  return [
    QuestionType.RADIO,
    QuestionType.DROPDOWN,
    QuestionType.CHECKBOX
  ].includes(type);
}

export function supportsRequired(type: QuestionType) {
  return [
    QuestionType.TEXTAREA,
    QuestionType.DROPDOWN,
    QuestionType.RADIO,
  ].includes(type);
}