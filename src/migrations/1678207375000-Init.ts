import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1678207375000 implements MigrationInterface {
  name = 'Init1678207375000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`like\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userCreatorId\` varchar(36) NOT NULL,
                \`postId\` varchar(36) NULL,
                \`comentId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`post\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`description\` varchar(255) NOT NULL,
                \`userCreatorId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`user_status\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`message_status\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`chat\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userOneId\` varchar(36) NOT NULL,
                \`userTwoId\` varchar(36) NOT NULL,
                \`messagesId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`group\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userCreatorId\` varchar(36) NOT NULL,
                \`chatId\` varchar(36) NOT NULL,
                \`messagesId\` varchar(36) NULL,
                \`usersId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`message\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`description\` varchar(255) NOT NULL,
                \`userCreatorId\` varchar(36) NOT NULL,
                \`userReceiverId\` varchar(36) NOT NULL,
                \`groupId\` varchar(36) NULL,
                \`messageStatusId\` varchar(36) NOT NULL,
                \`chatId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`user\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`username\` varchar(255) NOT NULL,
                \`firstName\` varchar(255) NOT NULL,
                \`lastName\` varchar(255) NOT NULL,
                \`password\` varchar(255) NOT NULL,
                \`email\` varchar(255) NOT NULL,
                \`imageURL\` varchar(255) NULL,
                \`userStatusId\` varchar(36) NOT NULL,
                UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`),
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`coment\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userCreatorId\` varchar(36) NOT NULL,
                \`postId\` varchar(36) NOT NULL,
                \`description\` text NOT NULL,
                \`likesId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`user_following_user\` (
                \`userId_1\` varchar(36) NOT NULL,
                \`userId_2\` varchar(36) NOT NULL,
                INDEX \`IDX_9691163a986dfb589a90dea3d5\` (\`userId_1\`),
                INDEX \`IDX_a89f5a432c1edcd03a3b655532\` (\`userId_2\`),
                PRIMARY KEY (\`userId_1\`, \`userId_2\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`user_followers_user\` (
                \`userId_1\` varchar(36) NOT NULL,
                \`userId_2\` varchar(36) NOT NULL,
                INDEX \`IDX_26312a1e34901011fc6f63545e\` (\`userId_1\`),
                INDEX \`IDX_110f993e5e9213a7a44f172b26\` (\`userId_2\`),
                PRIMARY KEY (\`userId_1\`, \`userId_2\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_27952081185b68f423bceab7257\` FOREIGN KEY (\`userCreatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_3acf7c55c319c4000e8056c1279\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_08053fb502951724efeb25eb082\` FOREIGN KEY (\`comentId\`) REFERENCES \`coment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD CONSTRAINT \`FK_8c122a98618721072ca4afa1dd8\` FOREIGN KEY (\`userCreatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`chat\`
            ADD CONSTRAINT \`FK_589175ffb2e90ddc688fa4208ce\` FOREIGN KEY (\`userOneId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`chat\`
            ADD CONSTRAINT \`FK_1833605a8673be196ec0c3963e6\` FOREIGN KEY (\`userTwoId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`chat\`
            ADD CONSTRAINT \`FK_eab3b0dffc53c414f906c16efdc\` FOREIGN KEY (\`messagesId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD CONSTRAINT \`FK_1632d657510701be2c54dffd7f4\` FOREIGN KEY (\`userCreatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD CONSTRAINT \`FK_980d079e5ed7a0bb712ffdc921a\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD CONSTRAINT \`FK_0977b73a9aaa8dcd005d5356de2\` FOREIGN KEY (\`messagesId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\`
            ADD CONSTRAINT \`FK_adb912e10c347c8a1c9658dc4c4\` FOREIGN KEY (\`usersId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_11d8a4e5145e07915f5e3ed064a\` FOREIGN KEY (\`userCreatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_a9aa1ffcef5d5b7ce8d654510c6\` FOREIGN KEY (\`userReceiverId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_a85a728f01be8f15f0e52019389\` FOREIGN KEY (\`groupId\`) REFERENCES \`group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_96738d7a56425d974f75f1e8113\` FOREIGN KEY (\`messageStatusId\`) REFERENCES \`message_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_619bc7b78eba833d2044153bacc\` FOREIGN KEY (\`chatId\`) REFERENCES \`chat\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`user\`
            ADD CONSTRAINT \`FK_d6789a4d8957e8da9ea52a60a8b\` FOREIGN KEY (\`userStatusId\`) REFERENCES \`user_status\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`coment\`
            ADD CONSTRAINT \`FK_b8382df81181a791e89e274d29d\` FOREIGN KEY (\`userCreatorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`coment\`
            ADD CONSTRAINT \`FK_a5b94697f945c45a5118239731e\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`coment\`
            ADD CONSTRAINT \`FK_5e020655fa9557e05dd6ec4b55b\` FOREIGN KEY (\`likesId\`) REFERENCES \`like\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_following_user\`
            ADD CONSTRAINT \`FK_9691163a986dfb589a90dea3d5f\` FOREIGN KEY (\`userId_1\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_following_user\`
            ADD CONSTRAINT \`FK_a89f5a432c1edcd03a3b6555321\` FOREIGN KEY (\`userId_2\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_followers_user\`
            ADD CONSTRAINT \`FK_26312a1e34901011fc6f63545e2\` FOREIGN KEY (\`userId_1\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_followers_user\`
            ADD CONSTRAINT \`FK_110f993e5e9213a7a44f172b264\` FOREIGN KEY (\`userId_2\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            CREATE TABLE \`query-result-cache\` (
                \`id\` int NOT NULL AUTO_INCREMENT,
                \`identifier\` varchar(255) NULL,
                \`time\` bigint NOT NULL,
                \`duration\` int NOT NULL,
                \`query\` text NOT NULL,
                \`result\` text NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE \`query-result-cache\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_followers_user\` DROP FOREIGN KEY \`FK_110f993e5e9213a7a44f172b264\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_followers_user\` DROP FOREIGN KEY \`FK_26312a1e34901011fc6f63545e2\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_following_user\` DROP FOREIGN KEY \`FK_a89f5a432c1edcd03a3b6555321\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user_following_user\` DROP FOREIGN KEY \`FK_9691163a986dfb589a90dea3d5f\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`coment\` DROP FOREIGN KEY \`FK_5e020655fa9557e05dd6ec4b55b\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`coment\` DROP FOREIGN KEY \`FK_a5b94697f945c45a5118239731e\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`coment\` DROP FOREIGN KEY \`FK_b8382df81181a791e89e274d29d\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_d6789a4d8957e8da9ea52a60a8b\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_619bc7b78eba833d2044153bacc\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_96738d7a56425d974f75f1e8113\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_a85a728f01be8f15f0e52019389\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_a9aa1ffcef5d5b7ce8d654510c6\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_11d8a4e5145e07915f5e3ed064a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_adb912e10c347c8a1c9658dc4c4\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_0977b73a9aaa8dcd005d5356de2\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_980d079e5ed7a0bb712ffdc921a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`group\` DROP FOREIGN KEY \`FK_1632d657510701be2c54dffd7f4\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_eab3b0dffc53c414f906c16efdc\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_1833605a8673be196ec0c3963e6\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`chat\` DROP FOREIGN KEY \`FK_589175ffb2e90ddc688fa4208ce\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_8c122a98618721072ca4afa1dd8\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_08053fb502951724efeb25eb082\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_3acf7c55c319c4000e8056c1279\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_27952081185b68f423bceab7257\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_110f993e5e9213a7a44f172b26\` ON \`user_followers_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_26312a1e34901011fc6f63545e\` ON \`user_followers_user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_followers_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_a89f5a432c1edcd03a3b655532\` ON \`user_following_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_9691163a986dfb589a90dea3d5\` ON \`user_following_user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_following_user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`coment\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`message\`
        `);
    await queryRunner.query(`
            DROP TABLE \`group\`
        `);
    await queryRunner.query(`
            DROP TABLE \`chat\`
        `);
    await queryRunner.query(`
            DROP TABLE \`message_status\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user_status\`
        `);
    await queryRunner.query(`
            DROP TABLE \`post\`
        `);
    await queryRunner.query(`
            DROP TABLE \`like\`
        `);
  }
}
