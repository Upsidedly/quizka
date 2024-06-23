import { conjugationQuiz } from "./conjugation";

export interface Quiz {
  name: string;
  questions: Question[];
}

export type Question = QuestionSingleText | QuestionMultipleText | `${string}? (${string}${`|${string}` | ""})`;

export interface QuestionMultipleText {
  text: string;
  type: "multipleText";
  answers: string[][];
}

export function parseQuestionString(question: Question): QuestionStringless {
  if (typeof question !== "string") return question;
  const question2 = question.trim().replaceAll('\n', " ");
  const questionText = question2.match(/^.+\?/)![0];
  const answers = question2
    .match(/\(.+\)/)![0]
    .slice(1, -1)
    .split("|")
    .map((a) => a.trim().split("&"));
  const isAllSingle = answers.every((a) => a.length === 1);
  if (isAllSingle) return { text: questionText, type: "singleText", answers: answers.map((a) => a[0]) };
  return { text: questionText, type: "multipleText", answers: answers };
}

export type QuestionStringless = Exclude<Question, string>;

export type QuestionTypeMap = {
  [K in QuestionStringless["type"]]: Extract<QuestionStringless, { type: K }>;
};

export function isQuestionType<T extends keyof QuestionTypeMap>(question: QuestionStringless, type: T): question is QuestionTypeMap[T] {
  return question.type === type;
}

export interface QuestionSingleText {
  text: string;
  type: "singleText";
  answers: string[];
}

export const quizzes = ["Conjugation"] as const;
export const quizMap: Record<(typeof quizzes)[number], Quiz> = {
  Conjugation: conjugationQuiz,
};
