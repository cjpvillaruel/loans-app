import { CreateUserDto } from '../dto/userDto';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export type EmploymentStatus = 'employed' | 'unemployed' | 'self-employed';

class User {
  private static users: IUser[] = [];

  static createUser(userData: CreateUserDto): IUser {
    const newUser: IUser = {
      id: (User.users.length + 1).toString(),
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password, // In production, ensure this is hashed
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    User.users.push(newUser);
    return newUser;
  }

  static getUserById(id: string): IUser | undefined {
    return User.users.find((user) => user.id === id);
  }

  static updateUser(
    id: string,
    userData: Partial<CreateUserDto>,
  ): IUser | undefined {
    const user = User.getUserById(id);
    if (!user) return undefined;

    user.firstName = userData.firstName || user.firstName;
    user.lastName = userData.lastName || user.lastName;
    user.email = userData.email || user.email;
    if (userData.password) {
      user.password = userData.password; // In production, ensure this is hashed
    }
    user.updatedAt = new Date();
    return user;
  }

  static deleteUser(id: string): boolean {
    const index = User.users.findIndex((user) => user.id === id);
    if (index === -1) return false;
    User.users.splice(index, 1);
    return true;
  }

  static listUsers(): IUser[] {
    return User.users;
  }
}

export default User;
