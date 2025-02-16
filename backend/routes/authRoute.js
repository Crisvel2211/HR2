import express from 'express'
import { signin, signup, getAllUsers, getUser, updateUser, deleteUser } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup );
router.post('/signin', signin);
router.get('/',  getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router