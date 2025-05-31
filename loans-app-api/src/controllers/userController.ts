import { Request, Response } from 'express';
import { UserService } from '../services/userService';
import { IUser } from '../models/userModel';

export class UserController {
    static async createUser(req: Request, res: Response) {
        try {
            const user = UserService.createUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    static async getUser(req: Request, res: Response) : Promise<void> {
        try {
            const user = UserService.getUserById(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    static async updateUser(req: Request, res: Response) : Promise<void> {
        try {
            const user =  UserService.updateUser(req.params.id, req.body);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    static async deleteUser(req: Request, res: Response) : Promise<void> {
        try {
            const deleted =  UserService.deleteUser(req.params.id);
            if (!deleted) {
                 res.status(404).json({ message: 'User not found' });
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    static async listUsers(req: Request, res: Response) {
        try {
            const users =  UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
}