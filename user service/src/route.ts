import express from 'express'
import { loginUser, registerUser, userProfile } from './controller.js';
import { isAuth } from './middleware.js';

const router = express.Router()

router.post('/register', registerUser);
router.post('/login', loginUser)
router.get('/profile', isAuth, userProfile)

export default router;