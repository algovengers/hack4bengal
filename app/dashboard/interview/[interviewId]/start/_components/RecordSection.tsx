"use client";
import { Button } from "@/components/ui/button";
import { chatSession } from "@/utils/GeminiAi";
import { db } from "@/utils/db";
import { MockInterviewType, UserAnswer, UserAnswerType } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { Mic } from "lucide-react";
import moment from "moment";
import { actionAsyncStorage } from "next/dist/client/components/action-async-storage-instance";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { toast } from "sonner";


interface ResultType {
  transcript: string;
  timestamp: number;
}

interface RecordSectionProps {
  mockInterviewQuestion: MockInterviewQuestion[];
  activeQuestionIndex: number;
  interviewData: InterviewData | null;
}

interface MockInterviewQuestion {
  id: string;
  question: string;
  answer: string;
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

const RecordSection: React.FC<RecordSectionProps> = ({
  mockInterviewQuestion,
  activeQuestionIndex,
  interviewData,
}) => {
  const [userAnswer, setUserAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useUser();

  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    (results as ResultType[]).map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);


  useEffect(() => {
    if(!isRecording && userAnswer.length > 10) {
        UpdateUserAnswer();
    }
    if (userAnswer?.length < 10) {
        setLoading(false);
        toast("Error while saving your answer, Please record again");
        return;
      }
  }, [userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
      
    } else {
      startSpeechToText();
    }
  };

  const UpdateUserAnswer = async () => {
    setLoading(true);
    const feedbackPrompt =
        "Question:" +
        mockInterviewQuestion[activeQuestionIndex]?.question +
        ", User Answer:" +
        userAnswer +
        ", Depends on question and user answer for given interview question" +
        " Please give us rating for answer and feedback as area of improvement if any !" +
        "in just 3 to 5 lines to improve it in JSON format with rating field and feedback field";

      const result = await chatSession.sendMessage(feedbackPrompt);

      const mockJsonResp = result.response
        .text()
        .replace("```json", "")
        .replace("```", "");

      const JsonFeedbackResp = JSON.parse(mockJsonResp);
      const data: UserAnswerType = {
        mockIdref: interviewData?.mockId!,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress!,
        createdAt: moment().format("DD-MM-yyyy"),
      };

      const resp = await db.insert(UserAnswer).values(data);

      if (resp) {
        toast("Answer recorded successfully.");
        setUserAnswer('');
        setResults([]);
      }
      setResults([]);
      setLoading(false);
  }

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col mt-20 justify-center items-center bg-black rounded-lg p-5">
        <Image
          src={"/webcam.png"}
          alt="webcam"
          width={200}
          height={200}
          className="absolute"
        />
        <Webcam
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
        />
      </div>
      <Button disabled={loading} variant="outline" className="my-10" onClick={StartStopRecording}>
        {isRecording ? (
          <h2 className="text-red-600 flex gap-2">
            <Mic /> Stop Recording
          </h2>
        ) : (
          "Record Answer"
        )}
      </Button>
    </div>
  );
};

export default RecordSection;
