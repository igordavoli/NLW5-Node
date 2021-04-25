import { Request, Response } from 'express';
import { MessagesService } from '../services/MessagesService';

class MessagesController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { adminId, userId, text } = req.body;
      const messagesService = new MessagesService;
      const savedMessage = await messagesService.create({ adminId, userId, text });

      return res.status(201).json({ savedMessage });

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
  async listByUser(req: Request, res: Response): Promise<Response> {
    const { userId } = req.params;
    const messagesService = new MessagesService;
    const messages = await messagesService.listByUser(userId);

    return res.status(200).json({ messages });
  }
}

export { MessagesController };