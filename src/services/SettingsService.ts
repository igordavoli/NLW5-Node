import { SettingsRepository } from "../repositories/SettingsRepository";
import { getCustomRepository } from 'typeorm';

interface ISettings {
  chat: boolean;
  username: string;
}

class SettingsService {
  async create({ chat, username }: ISettings) {
    const settingsRepository = getCustomRepository(SettingsRepository);
    const hasSetting = await settingsRepository.findOne({ username });

    if (hasSetting) {
      throw Error('UserAlreadyHasASetting!')
    }

    const newSetting = settingsRepository.create({ chat, username });
    const savedSetting = await settingsRepository.save(newSetting);

    return savedSetting;
  }
}

export { SettingsService };