import {MigrationInterface, QueryRunner} from "typeorm";

export class PredictionMigration1576179319491 implements MigrationInterface {
    name = 'PredictionMigration1576179319491'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `prediction` (`id` int NOT NULL AUTO_INCREMENT, `data` text NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), `imageId` int NULL, UNIQUE INDEX `REL_62b880b51a308a40025bda05bc` (`imageId`), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
        await queryRunner.query("ALTER TABLE `prediction` ADD CONSTRAINT `FK_62b880b51a308a40025bda05bce` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prediction` DROP FOREIGN KEY `FK_62b880b51a308a40025bda05bce`", undefined);
        await queryRunner.query("DROP INDEX `REL_62b880b51a308a40025bda05bc` ON `prediction`", undefined);
        await queryRunner.query("DROP TABLE `prediction`", undefined);
    }

}
