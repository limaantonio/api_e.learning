import {Router} from 'express'
import { LessonController } from './controllers/LessonController'
import { CourseController } from './controllers/CourseController'

const router = Router()

const userController = new CourseController()
const lessonController = new LessonController()

router.post('/course', userController.create)
router.get('/courses', userController.list)
router.get('/course/:id', userController.index)

router.post('/lesson', lessonController.create)
router.get('/lessons', lessonController.list)

export {router}
