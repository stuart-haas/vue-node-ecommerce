import {MigrationInterface, QueryRunner} from "typeorm";

export class SessionMigration1576168804594 implements MigrationInterface {
    name = 'SessionMigration1576168804594'

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `session` (`id` varchar(255) NOT NULL, `expiresAt` int NOT NULL, `data` text NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `session`", undefined);
    }

}
