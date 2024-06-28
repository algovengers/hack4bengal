"use server"

import { db } from "@/utils/db";
import { MockInterview } from "@/utils/schema";

export const createInterview = async(rawdata: any) =>{
    try {
        const data = JSON.parse(rawdata)
        const result = await db.insert(MockInterview).values(data).returning({mockId:MockInterview.mockId});
        return {result : result}
    } catch (error) {
        throw new Error
    }
}