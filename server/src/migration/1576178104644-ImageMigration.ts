import {MigrationInterface, QueryRunner} from "typeorm";

export class ImageMigration1576178104644 implements MigrationInterface {
    name = 'ImageMigration1576178104644'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `image` (`id` int NOT NULL AUTO_INCREMENT, `userId` int NOT NULL, `path` varchar(255) NOT NULL, `data` text NOT NULL, `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `image`", undefined);
    }

}
