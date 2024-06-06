import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UsersService } from './users.service';
import { NewUserInput } from './dto/new-user.input';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  async addUser(@Args('newUserData') newUserData: NewUserInput): Promise<User> {
    return this.usersService.addUser(newUserData);
  }

  @Query(() => [User])
  async getUsers(): Promise<User[]> {
    return this.usersService.getUsers();
  }
}
