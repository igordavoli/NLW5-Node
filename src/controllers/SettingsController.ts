import { Request, Response } from 'express'
import { SettingsRepository } from "../repositories/SettingsRepository";
import { getCustomRepository } from 'typeorm';

class SettingsController {
  async create(req: Request, res: Response) {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const { chat, username } = req.body;
    const newSetting = settingsRepository.create({ chat, username })
    const savedSetting = await settingsRepository.save(newSetting)

    res.status(201).json({ savedSetting })
  }
}


export { SettingsController };