import {MigrationInterface, QueryRunner} from "typeorm";

export class AddPriceToProduct1582517117547 implements MigrationInterface {
    name = "AddPriceToProduct1582517117547"

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` ADD `price` int NOT NULL", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `product` DROP COLUMN `price`", undefined);
    }

}
