import { MailAdapter } from "../adapters/mailAdapter";
import { FeedbacksRepository } from "../repositories/feedbacksRepository";

interface SubmitFeedbackCaseRequest{
  type: string
  comment: string
  screenshot?: string 
}

export class SubmitFeedbackUseCase{
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter
  ){}

  async execute(request: SubmitFeedbackCaseRequest){
    const { type, comment, screenshot } = request;

    if (!type) {
      throw new Error("Type is required")
    }

    if (!comment) {
      throw new Error("Comment is required");
    }

    if (screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error("Invalid screenshot format")
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot
    }) 

    await this.mailAdapter.sendMail({
      subject: "Novo Feddback",
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #333">`,
        `<p>Tipo do feedback: ${type}</p>`,
        `<p>Comentário: ${comment}</p>`,
        `</div>`,
      ].join("\n"),
    });
  }
}