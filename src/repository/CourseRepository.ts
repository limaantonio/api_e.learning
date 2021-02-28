import { EntityRepository, Repository } from "typeorm";
import { Course } from "../models/Course";

@EntityRepository(Course)
class CourseRepository extends Repository<Course>{

}

export {CourseRepository}