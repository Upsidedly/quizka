"use client";

import { Quiz } from "@/components/quiz";
import { Button } from "@/components/ui/button";
import { quizzes } from "@/quizzes/quizzes";
import { Autocomplete } from "@mantine/core";
import React from "react";

export default function Home() {
  const [quizName, setQuizName] = React.useState<string | undefined>(undefined);
  const quizNameRef = React.useRef<HTMLInputElement>(null);
  const [quizKey, setQuizKey] = React.useState<number>(1);
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 max-w-[100%]">
      <div className="flex flex-col gap-5 items-center">
        <h1 className="text-lg font-bold text-center">if you&apos;re cooked for spanish and you know it clap your hands 👏🏽👏🏽<br></br>you can also use this for chemistry ig</h1>
        <Autocomplete
          classNames={{
            dropdown: "fixed top-1 left-1 overflow-hidden p-3",
            input:
              "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          }}
          label="Quiz name"
          ref={quizNameRef}
          data={quizzes}
          type="text"
        />
        <Button onClick={() => setQuizName(quizNameRef.current?.value)}>Submit</Button>
      </div>
      {quizzes.includes(quizName as any) ? <Quiz name={quizName!} key={quizKey} />: 'No quiz found'}
      <Button onClick={() => setQuizKey(quizKey + 1)} variant="outline">Restart Quiz</Button>
      <p>To change a letter to its accented form, try either typing &lt; or &gt; after it.</p>
    </div>
  );
}
