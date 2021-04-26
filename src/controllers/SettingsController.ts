import { Request, Response } from 'express';
import { SettingsService } from '../services/SettingsService';

class SettingsController {
  //private service = new SettingsService;

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

  async findByUsername(req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params;
      const settingsService = new SettingsService;
      const settings = await settingsService.findByUsername(username);

      return res.status(200).json(settings)
    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.params;
      const { chat } = req.body;
      const settingsService = new SettingsService;
      const setting = await settingsService.update(username, chat);

      return res.status(200).json(setting);

    } catch (error) {
      return res.status(400).json({ message: error.message })
    }
  }
}

export { SettingsController };