import { UserEntity } from "../entities/user";

export interface UserRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  create(data: Omit<UserEntity, 'id'>): Promise<UserEntity>;
  findDoctors(query?: string): Promise<UserEntity[]>;
}
