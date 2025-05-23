import express from 'express'
import { loginUser, registerUser, userProfile } from './controller.js';

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/profile', userProfile)

export default router;