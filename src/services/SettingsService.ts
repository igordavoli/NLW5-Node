import { SettingsRepository } from "../repositories/SettingsRepository";
import { getCustomRepository, Repository } from 'typeorm';
import { Setting } from "../entities/Setting";

interface ISettings {
  chat: boolean;
  username: string;
}

class SettingsService {
  private repository: Repository<Setting>

  constructor() {
    this.repository = getCustomRepository(SettingsRepository);
  }

  async create({ chat, username }: ISettings) {
    const hasSetting = await this.repository.findOne({ username });

    if (hasSetting) {
      throw Error('UserAlreadyHasASetting!')
    }

    const newSetting = this.repository.create({ chat, username });
    const savedSetting = await this.repository.save(newSetting);

    return savedSetting;
  }

  async findByUsername(username: string) {
    const setting = await this.repository.findOne({ username });
    return setting;
  }

  async update(username: string, chat: boolean) {
    const setting = await this.repository.findOne({ username });

    setting.chat = chat;

    const updatedSetting = await this.repository.save(setting);

    return updatedSetting;
  }

}

export { SettingsService };