import {MigrationInterface, QueryRunner} from "typeorm";

export class imagePredictionCascadeDelete1576254964072 implements MigrationInterface {
    name = 'imagePredictionCascadeDelete1576254964072'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prediction` DROP FOREIGN KEY `FK_62b880b51a308a40025bda05bce`", undefined);
        await queryRunner.query("ALTER TABLE `prediction` ADD CONSTRAINT `FK_62b880b51a308a40025bda05bce` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `prediction` DROP FOREIGN KEY `FK_62b880b51a308a40025bda05bce`", undefined);
        await queryRunner.query("ALTER TABLE `prediction` ADD CONSTRAINT `FK_62b880b51a308a40025bda05bce` FOREIGN KEY (`imageId`) REFERENCES `image`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION", undefined);
    }

}
