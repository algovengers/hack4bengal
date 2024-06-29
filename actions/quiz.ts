"use server";

import { db } from "@/utils/db";
import { Quiz, QuizAnswer } from "@/utils/schema";
import { and, asc, desc, eq, sql } from "drizzle-orm";

export const createQuiz = async (data: any) => {
  try {
    const result = await db
      .insert(Quiz)
      .values(data)
      .returning({ quizId: Quiz.id });

    return result[0];
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const getQuiz = async (quizId: string) => {
  try {
    const result = await db
      .select({
        topic: Quiz.topic,
        questions: Quiz.question,
        difficulty: Quiz.difficulty,
      })
      .from(Quiz)
      .where(eq(Quiz.id, quizId));
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const getQuizAnswer = async (quizId: string) => {
  try {
    const result = await db
      .select({
        topic: Quiz.topic,
        answers: Quiz.answers,
        difficulty: Quiz.difficulty,
      })
      .from(Quiz)
      .where(eq(Quiz.id, quizId));
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const submitQuiz = async (
  quizId: any,
  userName: string,
  userEmail: string,
  data: any,
  time: Number
) => {
  const quizAnswer = await getQuizAnswer(quizId);
  const correctAnswers = JSON.parse(quizAnswer[0].answers);

  let points = 0;
  correctAnswers.forEach((answer: string, index: number) => {
    if (answer === data[index]) {
      points += 1;
    }
  });

  try {
    const result = await db.insert(QuizAnswer).values({
      userName,
      userEmail,
      correctAnswers: JSON.stringify(data),
      quizId,
      time,
      points,
    });
    return { result, correctAnswers };
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchQuizAnswerofUser = async (
  quizId: Number,
  userEmail: string
) => {
  try {
    const result = await db
      .select({
        correctAnswers: QuizAnswer.correctAnswers,
        points: QuizAnswer.points,
        time: QuizAnswer.time,
      })
      .from(QuizAnswer)
      .where(
        and(eq(QuizAnswer.quizId, quizId), eq(QuizAnswer.userEmail, userEmail))
      );
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const quizLeaderboard = async (quizId: number) => {
  try {
    const result = await db
      .select({
        userName: QuizAnswer.userName,
        points: QuizAnswer.points,
        time: QuizAnswer.time,
      })
      .from(QuizAnswer)
      .where(eq(QuizAnswer.quizId, quizId))
      .orderBy(desc(QuizAnswer.points), asc(QuizAnswer.time));
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
