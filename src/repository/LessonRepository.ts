import { EntityRepository, Repository } from "typeorm";
import { Lesson } from "../models/Lesson";

@EntityRepository(Lesson)
class LessonRepository extends Repository<Lesson>{

}

export {LessonRepository}