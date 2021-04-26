import {
  Entity,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from "typeorm";
import { v4 as uuid } from 'uuid';
import { User } from "./User";

@Entity('connections')
class Connection {
  @PrimaryColumn()
  id: string;

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User)
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @Column({ name: 'admin_id' })
  adminId: string;

  @Column({ name: 'socket_id' })
  socketId: string;

  @CreateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  constructor() {
    if (!this.id) {
      this.id = uuid();
    }
  }
}

export { Connection };