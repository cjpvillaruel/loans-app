import { Router } from 'express';
import { UserController } from '../controllers/userController';


const router = Router();

router.get('/', UserController.listUsers);
router.get('/:id', UserController.getUser);
router.post('', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;