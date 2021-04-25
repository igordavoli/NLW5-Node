import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { chat, username } = req.body;
      const settingsService = new SettingsService;
      const savedSetting = await settingsService.create({ chat, username });

      return res.status(201).json({ savedSetting });

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

export { SettingsController };