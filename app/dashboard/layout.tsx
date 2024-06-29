"use client";
import React, { createContext, useState } from "react";
import Header from "./_components/Header";
import {
  InterviewData,
  MockInterviewQuestion,
} from "./interview/[interviewId]/start/page";

interface InterviewContext {
  interviewData: InterviewData | null;
  mockInterviewQuestion: MockInterviewQuestion[];
  activeQuestionIndex: number;
  setInterviewData?: any;
  setMockInterviewQuestion?: any;
  setActiveQuestionIndex?: any;
}

export const InterviewContext = createContext<InterviewContext>(
  {} as InterviewContext
);
export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );

  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    MockInterviewQuestion[]
  >([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  return (
    <div>
      <Header />
      <InterviewContext.Provider
        value={{
          interviewData,
          mockInterviewQuestion,
          activeQuestionIndex,
          setActiveQuestionIndex,
          setInterviewData,
          setMockInterviewQuestion,
        }}
      >
        <div className="mx-5 md:mx-20 lg:mx-36 mt-8">{children}</div>
      </InterviewContext.Provider>
    </div>
  );
}
