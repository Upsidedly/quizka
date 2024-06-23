import { Quiz } from "./quizzes";

export const conjugationQuiz = {
    name: "Conjugation",
    questions: [
        {
            text: "The verb to be is conjugated as follows:",
            type: "singleText",
            answers: ["es"],
        },
        'What is? (a|b|a)',
        'What is love? (joy&happiness|sorrow&pain|a|b)',
    ]
} satisfies Quiz;