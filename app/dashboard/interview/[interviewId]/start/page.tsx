"use client";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import React, { useEffect, useState } from "react";
import { eq } from "drizzle-orm";
import QuestionSection from "./_components/QuestionSection";
import RecordSection from "./_components/RecordSection";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface InterviewProps {
  params: any;
}

interface InterviewData {
  id: number;
  jsonMockResp: string;
  jobPosition: string;
  jobDesc: string;
  jobExperience: string;
  createdBy: string;
  createdAt: string;
  mockId: string;
}

interface MockInterviewQuestion {
  id: string;
  question: string;
  answer: string;
}

const StartInterview: React.FC<InterviewProps> = ({ params }) => {
  const [interviewData, setInterviewData] = useState<InterviewData | null>(
    null
  );

  const [mockInterviewQuestion, setMockInterviewQuestion] = useState<
    MockInterviewQuestion[]
  >([]);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number>(0);

  useEffect(() => {
    GetInterViewDetails();
  }, []);

  const GetInterViewDetails = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));

    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
    console.log(jsonMockResp);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <QuestionSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
        />

        <RecordSection
          mockInterviewQuestion={mockInterviewQuestion}
          activeQuestionIndex={activeQuestionIndex}
          interviewData={interviewData}
        />
      </div>

      <div className="flex justify-end gap-6">
        {activeQuestionIndex > 0 && <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex-1)}>Previous Question</Button>}
        {activeQuestionIndex != mockInterviewQuestion?.length - 1 && (
          <Button onClick={() => setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>
        )}
        {activeQuestionIndex == mockInterviewQuestion?.length - 1 && (
          <Link href={'/dashboard/interview/'+interviewData?.mockId+"/feedback"}>
          <Button >End Interview</Button></Link>
        )}
      </div>
    </div>
  );
};

export default StartInterview;
