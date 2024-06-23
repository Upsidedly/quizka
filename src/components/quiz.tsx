import { spanishify } from "@/lib/utils";
import { QuestionStringless, QuestionTypeMap, parseQuestionString, quizMap, quizzes } from "@/quizzes/quizzes";
import { Button, Fieldset, TextInput } from "@mantine/core";
import React, { useMemo } from "react";
import { SpanishInput } from "./spanish-input";
type ExpectedAnswerMap = {
  singleText: string;
  multipleText: string[];
};
type QuestionType = { [K in keyof QuestionTypeMap]: [K, ExpectedAnswerMap[K]] }[keyof {
  [K in keyof QuestionTypeMap]: [K, QuestionTypeMap[K]];
}];

interface QuizData {
  score: number;
  questionIndex: number;
  currentAnswer: QuestionType;
  currentQuestion: QuestionStringless;
  wrong?: string;
  done: boolean;
}

export function QuizQuestion({ data, setData }: { data: QuizData; setData: (data: (data: QuizData) => QuizData) => void }) {
  console.log(data.currentAnswer[1]);
  switch (data.currentAnswer[0]) {
    case "multipleText":
      return (
        <div>
          <h1 className="text-xl mb-5">{data.currentQuestion.text}</h1>
          <ol className="list-decimal list-inside space-y-2">
            {(data.currentAnswer[1] as string[]).map((_, i) => (
              <li key={i}>
                <SpanishInput
                  className="inline-block"
                  key={data.currentQuestion.text}
                  onChange={(e) =>
                    setData(
                      (old) =>
                        ({
                          ...old,
                          currentAnswer: [old.currentAnswer[0], (old.currentAnswer[1] as string[]).with(i, e)] as QuestionType,
                        } satisfies QuizData)
                    )
                  }
                />
              </li>
            ))}
          </ol>
        </div>
      );

    case "singleText":
      return (
        <div>
          <h1 className="text-xl mb-5">{data.currentQuestion.text}</h1>
          <SpanishInput
            key={data.currentQuestion.text}
            onChange={(e) =>
              setData(
                (old) =>
                  ({
                    ...old,
                    currentAnswer: [old.currentAnswer[0], e] as QuestionType,
                  } satisfies QuizData)
              )
            }
          />
        </div>
      );
    default:
      return <p>Unknown question type</p>;
  }
}

export function Quiz({ name }: { name: string }) {
  const quiz = quizMap[name as (typeof quizzes)[number]];
  const firstQ = parseQuestionString(quiz.questions[0]);
  const [quizData, setQuizData] = React.useState<QuizData>({
    score: 0,
    questionIndex: 0,
    currentAnswer: [firstQ.type, Array.isArray(firstQ.answers[0]) ? Array(firstQ.answers[0].length).fill(undefined) : ""] as QuestionType,
    currentQuestion: firstQ,
    done: false,
  });

  function next(isCorrect: boolean | undefined, answerComparison: { correct: string; wrong: string } | undefined) {
    if (quiz.questions.length === quizData.questionIndex + 1) {
      return setQuizData((old) => ({
        ...old,
        questionIndex: !answerComparison ? old.questionIndex + 1 : old.questionIndex,
        wrong: answerComparison ? `Expected the answer to be <span class="font-bold text-green-500">${answerComparison.correct}</span> but you wrote <span class="font-bold text-red-500">${answerComparison.wrong}</span>` : undefined,
        score: isCorrect ? old.score + 1 : old.score,
        done: true,
      }));
    }
    setQuizData((old) => { 

        const newQ = parseQuestionString(quiz.questions[!answerComparison ? old.questionIndex + 1 : old.questionIndex]);
        console.log(newQ.type)
        
        return {
      ...old,
      score: isCorrect ? old.score + 1 : old.score,
      questionIndex: !answerComparison ? old.questionIndex + 1 : old.questionIndex,
      wrong: answerComparison ? `Expected the answer to be <span class="font-bold text-green-500">${answerComparison.correct}</span> but you wrote <span class="font-bold text-red-500">${answerComparison.wrong}</span>` : undefined,
      ...(!answerComparison ? { currentQuestion: newQ } : {}),
      currentQuestion: newQ,
      currentAnswer: [newQ.type, Array.isArray(newQ.answers[0]) ? Array(newQ.answers[0].length).fill("") : ""] as QuestionType,
    }});
  }

  function handleSubmit() {
    let isCorrect = false;
    let answerComparison: undefined | { correct: string; wrong: string } = undefined;
    console.log('inhandle: ' + quizData.currentAnswer[0])
    switch (quizData.currentAnswer[0]) {
      case "multipleText":
        const sortedAndNormalizedAnswers = quizData.currentAnswer[1].map((a) => a.toLowerCase().trim()).sort();
        isCorrect = quizData.currentQuestion.answers.some(
          (a) =>
            (a as string[])
              .map((a) => a.toLowerCase().trim())
              .sort()
              .join(" ") === sortedAndNormalizedAnswers.join(" ")
        );
        if (!isCorrect)
          answerComparison = { correct: (quizData.currentQuestion.answers[0] as string[]).join(", "), wrong: quizData.currentAnswer[1].join(", ") };
        break;

      case "singleText":
        isCorrect = quizData.currentQuestion.answers.some(
          (a) => (a as string).toLowerCase().trim() === (quizData.currentAnswer[1] as string).toLowerCase().trim()
        );
        if (!isCorrect) answerComparison = { correct: quizData.currentQuestion.answers[0] as string, wrong: quizData.currentAnswer[1] as string };
        break;
    }

    next(isCorrect, answerComparison);
  }

  if (quizData.wrong)
    return (
      <Fieldset legend={name}>
        <div className="flex flex-col gap-2 p-8">
          <h1 className="text-xl mb-5">{quizData.currentQuestion.text}</h1>
          <p dangerouslySetInnerHTML={{__html: quizData.wrong}}></p>
          <Button variant="light" className="mb-5" onClick={() => next(false, undefined)}>
            Next
          </Button>
          <div className="border rounded-lg p-4 w-max">
            <p>Question No. {quizData.questionIndex + 1}</p>
            <p>
              Score: {quizData.score}/{quiz.questions.length}
            </p>
          </div>
        </div>
      </Fieldset>
    );

  return (
    <Fieldset legend={name}>
      {!quizData.done ? (
        <div className="flex flex-col gap-2 p-8">
          <QuizQuestion data={quizData} setData={setQuizData} />
          <Button variant="light" className="mb-5" onClick={handleSubmit}>
            Submit
          </Button>
          <div className="border rounded-lg p-4 w-max">
            <p>Question No. {quizData.questionIndex + 1}</p>
            <p>
              Score: {quizData.score}/{quiz.questions.length}
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2 p-8">
          <p>it finish</p>
          <p>
            Score: {quizData.score}/{quiz.questions.length}
          </p>
          <Button
            onClick={() =>
              setQuizData({
                score: 0,
                questionIndex: 0,
                currentAnswer: [firstQ.type, Array.isArray(firstQ.answers[0]) ? Array(firstQ.answers[0].length) : ""] as QuestionType,
                currentQuestion: firstQ,
                done: false,
              })
            }
          >
            Again
          </Button>
        </div>
      )}
    </Fieldset>
  );
}
