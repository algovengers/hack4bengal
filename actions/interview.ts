"use server";

import { chatSession } from "@/utils/GeminiAi";
import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";


export const createInterview = async (
  rawdata: any
) => {
  try {
    const data = JSON.parse(rawdata);
    const InputPrompt =
      "Job position: " +
      data.jobPosition +
      ", Job Description :" +
      data.jobDesc +
      ", Years of Experience : " +
      data.jobExperience +
      ", Depends on Job Position, Job Description, and Year of experience give us " +
      10 +
      " most asked interview questions along with answer in json format. Give the question and answer field in json format.";

    const resp = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = resp.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    
      
      if (MockJsonResp) {
          const datawithGemini = {
              ...data,
              jsonMockResp: MockJsonResp,
              mockId: uuidv4()
              
          }
      const result = await db
        .insert(MockInterview)
        .values(datawithGemini)
        .returning({ mockId: MockInterview.mockId });
      return { result: result };
    }
  } catch (error) {
    // throw new Error();
    console.log(error)
  }
};
