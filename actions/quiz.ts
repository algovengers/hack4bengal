"use server";

import { db } from "@/utils/db";
import { Quiz, QuizAnswer } from "@/utils/schema";
import { and, asc, desc, eq, sql } from "drizzle-orm";

interface QuizAnswerType {
  user_email: string;
  user_name: string;
  correct_answers: string;
  points: string;
  time: number;
  quiz_id: any;
}

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
      .where(eq(Quiz.id, Number(quizId)));
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
      .where(eq(Quiz.id, Number(quizId)));
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
  time: number
) => {
  const quizAnswer = await getQuizAnswer(quizId);
  const correctAnswers = JSON.parse(quizAnswer[0].answers);

  let points = 0;
  correctAnswers.forEach((answer: string, index: number) => {
    if (answer === data[index]) {
      points += 1;
    }
  });

  const quizAnswerData: QuizAnswerType = {
    user_email: userEmail,
    user_name: userName,
    correct_answers: JSON.stringify(data),
    points: points.toString(), // Convert points to string
    time,
    quiz_id: quizId,
  };

  try {
    const result = await db.insert(QuizAnswer).values(quizAnswerData);
    return { result, correctAnswers };
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};

export const fetchQuizAnswerofUser = async (
  quizId: number,
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

export const getALLQuizForUser = async (userEmail: string) => {
  try {
    const result = await db
      .select({
        quizId: Quiz.id,
        topic: Quiz.topic,
        difficulty: Quiz.difficulty,
      })
      .from(Quiz)
      .where(eq(QuizAnswer.userEmail, userEmail));
    return result;
  } catch (error) {
    throw new Error(JSON.stringify(error));
  }
};
