import {MigrationInterface, QueryRunner} from "typeorm";

export class AlterSessions1576172284914 implements MigrationInterface {
    name = 'AlterSessions1576172284914'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `session` DROP COLUMN `data`", undefined);
        await queryRunner.query("ALTER TABLE `session` ADD `data` text NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `session` DROP COLUMN `data`", undefined);
        await queryRunner.query("ALTER TABLE `session` ADD `data` varchar(255) NOT NULL DEFAULT ''", undefined);
    }

}
