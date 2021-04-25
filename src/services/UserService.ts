import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UserService {
  async findOrCreate(email: string) {
    const usersRepository = getCustomRepository(UsersRepository);
    const hasUser = await usersRepository.findOne({ email });

    if (hasUser) {
      return hasUser;
    } else {
      const newUser = usersRepository.create({ email });
      const createdUser = await usersRepository.save(newUser);

      return createdUser;
    }
  }
}

export { UserService };