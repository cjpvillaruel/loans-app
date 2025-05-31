import { CreateUserDto, UpdateUserDto } from "../dto/userDto";
import User from "../models/userModel";

export class UserService {
    static createUser(data: CreateUserDto) {
        const user = User.createUser(data);
        return user;
    }
    
    static getUserById(userId: string) {
        return User.getUserById(userId);
    }

    static getAllUsers() {
        return User.listUsers();
    }

    static updateUser(userId: string, data: UpdateUserDto) {
        return  User.updateUser(userId, data);
    }

    static deleteUser(userId: string) {
        return User.deleteUser(userId);
    }
}

export const userService = new UserService();