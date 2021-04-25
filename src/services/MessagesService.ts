import { query } from 'express';
import { getCustomRepository, Repository } from 'typeorm';
import { Message } from '../entities/Message';
import { User } from '../entities/User';
import { MessagesRepository } from "../repositories/MessagesRepository";
import { UsersRepository } from '../repositories/UsersRepository';

interface IMessage {
  adminId?: string
  userId: string;
  text: string;
}

class MessagesService {
  private repository: Repository<Message>;
  private usersRepository: Repository<User>;

  constructor() {
    this.repository = getCustomRepository(MessagesRepository);
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async create({ adminId, userId, text }: IMessage) {
    await this.usersRepository.findOneOrFail({ id: userId });

    const newMessage = this.repository.create({ adminId, userId, text });
    const savedMessage = await this.repository.save(newMessage);

    return savedMessage;
  }

  async listByUser(userId: string) {
    const query = {
      where: { userId },
      relations: ['user']
    }

    const messages = this.repository.find(query);

    return messages;
  }
}

export { MessagesService };