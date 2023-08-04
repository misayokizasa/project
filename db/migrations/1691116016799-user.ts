import { MigrationInterface, QueryRunner } from "typeorm";

export class User1691116016799 implements MigrationInterface {
    name = 'User1691116016799'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`firstname\` varchar(100) NOT NULL, \`lastname\` varchar(100) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(100) NOT NULL, \`username\` varchar(50) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
