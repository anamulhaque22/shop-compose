import { Injectable } from '@nestjs/common';
import { InjectDrizzle } from '@nestjs/drizzle';
import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { NewUser, User, users } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectDrizzle()
    private readonly db: NodePgDatabase,
  ) {}

  findAll(): Promise<User[]> {
    return this.db.select().from(users);
  }

  async findOne(id: number): Promise<User | undefined> {
    const [user] = await this.db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async create(user: NewUser): Promise<User> {
    const [createdUser] = await this.db.insert(users).values(user).returning();
    return createdUser;
  }

  async remove(id: number): Promise<void> {
    await this.db.delete(users).where(eq(users.id, id));
  }
}
