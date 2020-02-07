import {MigrationInterface, QueryRunner} from "typeorm";

export class ImagePredictionRelationship1576181341314 implements MigrationInterface {
    name = 'ImagePredictionRelationship1576181341314'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prediction` CHANGE `imagePrediction` `imageId` int NULL", undefined);
        await queryRunner.query("ALTER TABLE `prediction` ADD UNIQUE INDEX `IDX_62b880b51a308a40025bda05bc` (`imageId`)", undefined);
        await queryRunner.query("CREATE UNIQUE INDEX `REL_62b880b51a308a40025bda05bc` ON `prediction` (`imageId`)", undefined);
        await queryRunner.query("ALTER TABLE `prediction` ADD CONSTRAINT `FK_62b880b51a308a40025bda05bce` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prediction` DROP FOREIGN KEY `FK_62b880b51a308a40025bda05bce`", undefined);
        await queryRunner.query("DROP INDEX `REL_62b880b51a308a40025bda05bc` ON `prediction`", undefined);
        await queryRunner.query("ALTER TABLE `prediction` DROP INDEX `IDX_62b880b51a308a40025bda05bc`", undefined);
        await queryRunner.query("ALTER TABLE `prediction` CHANGE `imageId` `imagePrediction` int NULL", undefined);
    }

}
