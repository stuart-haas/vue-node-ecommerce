import {MigrationInterface, QueryRunner} from "typeorm";

export class addUidColumn1576254173791 implements MigrationInterface {
    name = 'addUidColumn1576254173791'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP INDEX `IDX_62b880b51a308a40025bda05bc` ON `prediction`", undefined);
        await queryRunner.query("ALTER TABLE `prediction` ADD `uid` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `image` ADD `uid` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `session` ADD `uid` varchar(36) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `user` ADD `uid` varchar(36) NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `user` DROP COLUMN `uid`", undefined);
        await queryRunner.query("ALTER TABLE `session` DROP COLUMN `uid`", undefined);
        await queryRunner.query("ALTER TABLE `image` DROP COLUMN `uid`", undefined);
        await queryRunner.query("ALTER TABLE `prediction` DROP COLUMN `uid`", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `IDX_62b880b51a308a40025bda05bc` ON `prediction` (`imageId`)", undefined);
    }

}
