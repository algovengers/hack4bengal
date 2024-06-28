import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview', {
    id: serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy: varchar('createdBy').notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId:varchar('mockId').notNull()
});


export const UserAnswer=pgTable('userAnswer', {
    id: serial('id').primaryKey(),
    mockIdref:varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:varchar('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})



export interface MockInterviewType {
    id?: number;
    jsonMockResp: string;
    jobPosition: string;
    jobDesc: string;
    jobExperience: string;
    createdBy: string;
    createdAt: string;
    mockId: string;
}

export interface UserAnswerType {
    id?: number;
    mockIdref: string;
    question: string;
    correctAns: string;
    userAns: string;
    feedback: string;
    rating: string;
    userEmail: string;
    createdAt: string;
}