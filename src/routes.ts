import express from "express";
import { NodemailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prismaFeedbacksRepositoy";
import { SubmitFeedbackUseCase } from "./use-cases/submitFeedbackUseCase";

export const routes = express.Router()

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
  const nodeMailerMailAdapter = new NodemailerMailAdapter()
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository,
    nodeMailerMailAdapter
  );  

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot
  })

  return res.status(201).send()
});
