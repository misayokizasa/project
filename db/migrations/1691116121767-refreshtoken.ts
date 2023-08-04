import { MigrationInterface, QueryRunner } from "typeorm";

export class Refreshtoken1691116121767 implements MigrationInterface {
    name = 'Refreshtoken1691116121767'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`token_refreshs\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created\` date NOT NULL, \`updated\` date NOT NULL, \`active\` tinyint NOT NULL, \`active_sum\` int NOT NULL, \`refresh_token\` varchar(255) NOT NULL, \`ttl\` date NOT NULL, \`user_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`token_refreshs\` ADD CONSTRAINT \`FK_506d7b7b017004ff5cb33d97dd7\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`token_refreshs\` DROP FOREIGN KEY \`FK_506d7b7b017004ff5cb33d97dd7\``);
        await queryRunner.query(`DROP TABLE \`token_refreshs\``);
    }
}
