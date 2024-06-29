"use client";
import Link from "next/link";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function InterviewExperience() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_300px] gap-8 p-4 md:p-6">
        <div className="space-y-8">
          <InterviewListCard />
          <InterviewListCard />
        </div>
        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Share Your Experience</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter your experience title" />
                </div>
                <div>
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    id="content"
                    placeholder="Share your interview experience"
                    className="min-h-[200px]"
                  />
                </div>
                <Button className="w-full">Submit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

function InterviewListCard() {
  const [isOpened, setisOpened] = useState(false);
  const content = `I recently had the opportunity to interview for a software
            engineering position at Acme Inc, and I wanted to share my
            experience with you. The interview process was both challenging and
            rewarding, and I learned a lot about myself and the company along
            the way. I recently had the opportunity to interview for a product management
            position at Globex Corporation, and I wanted to share my experience
            with you. The interview process was both challenging and rewarding,
            and I learned a lot about myself and the company along the way.The first step in the process was a phone screening with the
            recruiter. They asked me about my background, my experience, and my
            interest in the role. I felt that I was able to articulate my
            qualifications well and demonstrate my enthusiasm for the position. The next step was an on-site interview with the hiring manager and
            the product team. This was the most challenging part of the process,
            as they asked me a series of complex questions about product
            strategy, user research, and project management. I found that I was
            able to draw on my experience in the field and my analytical skills
            to successfully navigate the interview. The next step was an on-site interview with the hiring manager and
            the product team. This was the most challenging part of the process,
            as they asked me a series of complex questions about product
            strategy, user research, and project management. I found that I was
            able to draw on my experience in the field and my analytical skills
            to successfully navigate the interview. The final step was a presentation to the executive team. They asked
            me to present a product roadmap and strategy for a new initiative. I
            felt that I was able to demonstrate my strategic thinking, my
            communication skills, and my alignment with the company's vision. Overall, I found the interview process to be a valuable learning
            experience. It challenged me to think critically, communicate
            effectively, and showcase my skills in a high-pressure environment.
            While the process was challenging, I ultimately felt that it was a
            positive experience that helped me to grow as a professional.`;
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-4">
          <div>
            <div className="font-medium">John Doe</div>
            <div className="text-sm text-muted-foreground">
              Published on June 29, 2024
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="prose prose-lg dark:prose-invert">
          <h1 className=" text-3xl font-bold mb-6">
            My Interview Experience at Acme Inc
          </h1>
          <p>{isOpened ? content : content.slice(0, 200) + ` ......`}</p>
        </div>
      </CardContent>
      {isOpened ? (
        <CardFooter>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <HeartIcon className="w-4 h-4" />
              <span className="sr-only">Like</span>
            </Button>
            <Button variant="ghost" size="icon">
              <MessageCircleIcon className="w-4 h-4" />
              <span className="sr-only">Comment</span>
            </Button>
            <Button variant="ghost" size="icon">
              <ShareIcon className="w-4 h-4" />
              <span className="sr-only">Share</span>
            </Button>
          </div>
        </CardFooter>
      ) : (
        <CardFooter>
          <Button
            onClick={() => setisOpened(true)}
            className="w-fit px-6"
            variant="ghost"
          >
            Read More
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

function HeartIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  );
}

function HomeIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function InfoIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

function LayoutGridIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="7" height="7" x="3" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="3" rx="1" />
      <rect width="7" height="7" x="14" y="14" rx="1" />
      <rect width="7" height="7" x="3" y="14" rx="1" />
    </svg>
  );
}

function MailIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function MenuIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}

function MountainIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}

function ShareIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  );
}
