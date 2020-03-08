import {MigrationInterface, QueryRunner} from "typeorm";

export class AddImageToProduct1583537961410 implements MigrationInterface {
    name = 'AddImageToProduct1583537961410'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` ADD `image` varchar(255) NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `price` float NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `price` int NOT NULL", undefined);
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `image`", undefined);
    }

}
