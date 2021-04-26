import { getCustomRepository, Repository } from "typeorm";
import { Connection } from "../entities/Connection";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

interface IConnectionCreate {
  userId: string;
  adminId?: string;
  socketId: string;
}

class ConnectionsService {
  private repository: Repository<Connection>;

  constructor() {
    this.repository = getCustomRepository(ConnectionsRepository);
  }

  async updateOrCreate({ userId, adminId, socketId }: IConnectionCreate) {
    const hasConnection = await this.repository.findOne({ userId });

    if (hasConnection) {
      const updatedConnection = await this.repository.update(
        hasConnection.id,
        { socketId }
      );
      return updatedConnection;
    } else {
      const newConnection = this.repository.create({
        userId,
        adminId,
        socketId
      });
      const savedConnection = await this.repository.save(newConnection);
      return savedConnection;
    }
  }
}

export { ConnectionsService };