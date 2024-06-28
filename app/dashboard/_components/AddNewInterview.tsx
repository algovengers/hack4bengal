"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { chatSession } from "@/utils/GeminiAi";
import { LoaderCircle } from "lucide-react";
import { MockInterview, MockInterviewType } from "@/utils/schema";
import { v4 as uuidv4 } from "uuid";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { useRouter } from "next/navigation";
import { createInterview } from "@/actions/interview";

const AddNewInterview = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [jobPosition, setJobPosition] = useState<string | undefined>(undefined);
  const [jobDesc, setJobDesc] = useState<string | undefined>(undefined);
  const [jobExperience, setJobExperience] = useState<string | undefined>(
    undefined
  );
  const [loading, setLoading] = useState(false);
  const [jsonResponse, setJsonResponse] = useState([]);

  const { user } = useUser();
  const router = useRouter();

  const onSubmit = async (e: any) => {
    setLoading(true);
    e.preventDefault();

    const InputPrompt =
      "Job position: " +
      jobPosition +
      ", Job Description :" +
      jobDesc +
      ", Years of Experience : " +
      jobExperience +
      ", Depends on Job Position, Job Description, and Year of experience give us " +
      process.env.NEXT_PUBLIC_INTERVIEW_QUESTION_COUNT +
      "most asked interview questions along with answer in json format. Give the question and answer field in json format.";

    const result = await chatSession.sendMessage(InputPrompt);
    const MockJsonResp = result.response
      .text()
      .replace("```json", "")
      .replace("```", "");
    console.log(JSON.parse(MockJsonResp));
    setJsonResponse(MockJsonResp);

    const data: MockInterviewType = {
      mockId: uuidv4(),
      jsonMockResp: MockJsonResp,
      jobPosition: jobPosition!,
      jobDesc: jobDesc!,
      jobExperience: jobExperience!,
      createdBy: user?.primaryEmailAddress?.emailAddress || '',
      createdAt: moment().format('DD-MM-yyyy')
    };
    if(MockJsonResp) {
    const {result} = await createInterview(JSON.stringify(data));
    console.log("Inserted id", result);
    if(result) {
      setOpenDialog(false);
      router.push('/dashboard/interview/'+result[0]?.mockId);
    }
    } else {
      console.log("error");
    }

    setLoading(false);
  };

  return (
    <div>
      <div
        className="p-10 border rounded-lg bg-gray-200 hover:scale-105 hover:shadow-md cursor-pointer transition-all"
        onClick={() => setOpenDialog(true)}
      >
        <h2 className=" text-lg text-center">+ Add New</h2>
      </div>

      <Dialog open={openDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Tell us more about your job interviewing ?
            </DialogTitle>
            <DialogDescription>
              <form onSubmit={onSubmit}>
                <div>
                  <h2 className="">
                    Add Details about your job position/role, Job Description,
                    and year of experience.
                  </h2>
                  <div className="mt-7 my-2">
                    <label>Job Role/Job Position</label>
                    <Input
                      placeholder="Ex. Full Stack Developer"
                      required
                      onChange={(e) => setJobPosition(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Job Description/ Tech Stack</label>
                    <Input
                      placeholder="Ex. React, Angular, NodeJs, SQL, etc."
                      required
                      onChange={(e) => setJobDesc(e.target.value)}
                    />
                  </div>
                  <div className="my-3">
                    <label>Years of Experience</label>
                    <Input
                      placeholder="Ex. 5"
                      type="number"
                      max={50}
                      required
                      onChange={(e) => setJobExperience(e.target.value)}
                    />
                  </div>
                </div>

                <div className="flex gap-5 justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <LoaderCircle className="animate-spin" /> Generating
                        from AI{" "}
                      </>
                    ) : (
                      "Start Interview"
                    )}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewInterview;
