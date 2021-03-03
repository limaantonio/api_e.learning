import {MigrationInterface,Table,TableColumn, TableForeignKey, QueryRunner} from "typeorm";

export class CreateLessons1614310466620 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "lessons",
                columns: [
                {
                    name: "id",
                    type: "uuid"
                },
                {
                    name: "name",
                    type: "varchar"
                },
                {
                    name: "duration",
                    type: "integer"
                },
                {
                    name: "description",
                    type: "varchar",
                    
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()"
                },
                {
                    name: 'video_id',
                    type: 'varchar',
                },
                {
                    name: "course_id",
                    type: "uuid"
                }
             ],
             foreignKeys: [
                {
                    name: 'FKCourse',
                    referencedTableName: 'courses',
                    referencedColumnNames: ['id'],
                    columnNames: ['course_id'],
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',

                }
            ],
            }
        )
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
       await queryRunner.getTable("lessons");

    }

}
