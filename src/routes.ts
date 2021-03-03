import {Router} from 'express'
import { LessonController } from './controllers/LessonController'
import { CourseController } from './controllers/CourseController'
import { UserController } from './controllers/UserController'
import { AuthController } from './controllers/AuthController'

const router = Router()

const userController = new UserController()
const courseController = new CourseController()
const lessonController = new LessonController()
const authController = new AuthController()

router.post('/course', courseController.create)
router.get('/courses', courseController.list)
router.get('/course/:id', courseController.index)
router.put('/course/:id', courseController.update)

router.post('/lesson', lessonController.create)
router.get('/lessons', lessonController.list)
router.put('/lesson/:id', lessonController.update)

router.get('/courses/:id/lessons', lessonController.listByCourse)

router.post('/user', userController.create);
router.get('/user', userController.list);
router.post('/register', authController.register);
router.post('/authenticate', authController.authenticate);
router.post('/forgotPassword', authController.forgot_password);

export {router}
