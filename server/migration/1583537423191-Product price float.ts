import {MigrationInterface, QueryRunner} from "typeorm";

export class ProductPriceFloat1583537423191 implements MigrationInterface {
    name = 'ProductPriceFloat1583537423191'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `price` float NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `price`", undefined);
        await queryRunner.query("ALTER TABLE `product` ADD `price` int NOT NULL", undefined);
    }

}
