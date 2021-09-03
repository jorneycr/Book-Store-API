import {MigrationInterface, QueryRunner} from "typeorm";

export class fixName1630643424359 implements MigrationInterface {
    name = 'fixName1630643424359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_details" ALTER COLUMN "lastname" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "public"."user_details" ALTER COLUMN "lastname" SET NOT NULL`);
    }

}
