import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1678307375000 implements MigrationInterface {
  name = 'Init1678307375000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE \`like\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`userId\` varchar(36) NOT NULL,
                \`postId\` varchar(36) NOT NULL,
                \`commentId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`post\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`title\` varchar(255) NOT NULL,
                \`content\` longtext NOT NULL,
                \`authorId\` varchar(36) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`forum\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                \`title\` varchar(255) NOT NULL,
                \`content\` longtext NOT NULL,
                \`authorId\` varchar(36) NOT NULL,
                \`commentsId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`comment\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`content\` longtext NULL,
                \`authorId\` varchar(36) NOT NULL,
                \`postId\` varchar(36) NULL,
                \`replyToId\` varchar(36) NULL,
                \`forumId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`message_type\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`message\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`content\` longtext NULL,
                \`authorId\` varchar(36) NOT NULL,
                \`parentMessageId\` varchar(36) NULL,
                \`messageTypeId\` varchar(36) NULL,
                \`recipientId\` varchar(36) NULL,
                \`discussionGroupId\` varchar(36) NULL,
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
                UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`),
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`discussion_group\` (
                \`id\` varchar(36) NOT NULL,
                \`creationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
                \`modificationDate\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
                \`name\` varchar(255) NOT NULL,
                \`messagesId\` varchar(36) NULL,
                PRIMARY KEY (\`id\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`forum_members_user\` (
                \`forumId\` varchar(36) NOT NULL,
                \`userId\` varchar(36) NOT NULL,
                INDEX \`IDX_43659f679ff125e88c07ae5670\` (\`forumId\`),
                INDEX \`IDX_207dec6c2fd6ab5c80406e4466\` (\`userId\`),
                PRIMARY KEY (\`forumId\`, \`userId\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            CREATE TABLE \`discussion_group_members_user\` (
                \`discussionGroupId\` varchar(36) NOT NULL,
                \`userId\` varchar(36) NOT NULL,
                INDEX \`IDX_36841cb8c9794686701f83a420\` (\`discussionGroupId\`),
                INDEX \`IDX_8b0eac35e2c9546f2772adce0a\` (\`userId\`),
                PRIMARY KEY (\`discussionGroupId\`, \`userId\`)
            ) ENGINE = InnoDB
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_e8fb739f08d47955a39850fac23\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_3acf7c55c319c4000e8056c1279\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\`
            ADD CONSTRAINT \`FK_d86e0a3eeecc21faa0da415a18a\` FOREIGN KEY (\`commentId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`post\`
            ADD CONSTRAINT \`FK_c6fb082a3114f35d0cc27c518e0\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum\`
            ADD CONSTRAINT \`FK_6929a62f80e1ff2722b4eb68b91\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum\`
            ADD CONSTRAINT \`FK_a2e48fe1f94415536523e22d751\` FOREIGN KEY (\`commentsId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_276779da446413a0d79598d4fbd\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_94a85bb16d24033a2afdd5df060\` FOREIGN KEY (\`postId\`) REFERENCES \`post\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_cfc14dc2cafa339954de748ebf3\` FOREIGN KEY (\`replyToId\`) REFERENCES \`comment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\`
            ADD CONSTRAINT \`FK_cb0c4df2811596da3a173de9d0a\` FOREIGN KEY (\`forumId\`) REFERENCES \`forum\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_c72d82fa0e8699a141ed6cc41b3\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_575b24e003b8881e64fa53cd16d\` FOREIGN KEY (\`parentMessageId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_bb5f53ce4099aec85c0f8ffd92a\` FOREIGN KEY (\`messageTypeId\`) REFERENCES \`message_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_445b786f516688cf2b81b8981b6\` FOREIGN KEY (\`recipientId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\`
            ADD CONSTRAINT \`FK_ab2f4f02c0d29f91e47d02e3b30\` FOREIGN KEY (\`discussionGroupId\`) REFERENCES \`discussion_group\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`discussion_group\`
            ADD CONSTRAINT \`FK_01b56917114e941f938862e9b96\` FOREIGN KEY (\`messagesId\`) REFERENCES \`message\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum_members_user\`
            ADD CONSTRAINT \`FK_43659f679ff125e88c07ae56700\` FOREIGN KEY (\`forumId\`) REFERENCES \`forum\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum_members_user\`
            ADD CONSTRAINT \`FK_207dec6c2fd6ab5c80406e44666\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`discussion_group_members_user\`
            ADD CONSTRAINT \`FK_36841cb8c9794686701f83a4205\` FOREIGN KEY (\`discussionGroupId\`) REFERENCES \`discussion_group\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
        `);
    await queryRunner.query(`
            ALTER TABLE \`discussion_group_members_user\`
            ADD CONSTRAINT \`FK_8b0eac35e2c9546f2772adce0a9\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE
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
            ALTER TABLE \`discussion_group_members_user\` DROP FOREIGN KEY \`FK_8b0eac35e2c9546f2772adce0a9\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`discussion_group_members_user\` DROP FOREIGN KEY \`FK_36841cb8c9794686701f83a4205\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum_members_user\` DROP FOREIGN KEY \`FK_207dec6c2fd6ab5c80406e44666\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum_members_user\` DROP FOREIGN KEY \`FK_43659f679ff125e88c07ae56700\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`discussion_group\` DROP FOREIGN KEY \`FK_01b56917114e941f938862e9b96\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_ab2f4f02c0d29f91e47d02e3b30\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_445b786f516688cf2b81b8981b6\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_bb5f53ce4099aec85c0f8ffd92a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_575b24e003b8881e64fa53cd16d\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`message\` DROP FOREIGN KEY \`FK_c72d82fa0e8699a141ed6cc41b3\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cb0c4df2811596da3a173de9d0a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_cfc14dc2cafa339954de748ebf3\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_94a85bb16d24033a2afdd5df060\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`comment\` DROP FOREIGN KEY \`FK_276779da446413a0d79598d4fbd\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum\` DROP FOREIGN KEY \`FK_a2e48fe1f94415536523e22d751\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`forum\` DROP FOREIGN KEY \`FK_6929a62f80e1ff2722b4eb68b91\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_c6fb082a3114f35d0cc27c518e0\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_d86e0a3eeecc21faa0da415a18a\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_3acf7c55c319c4000e8056c1279\`
        `);
    await queryRunner.query(`
            ALTER TABLE \`like\` DROP FOREIGN KEY \`FK_e8fb739f08d47955a39850fac23\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_8b0eac35e2c9546f2772adce0a\` ON \`discussion_group_members_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_36841cb8c9794686701f83a420\` ON \`discussion_group_members_user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`discussion_group_members_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_207dec6c2fd6ab5c80406e4466\` ON \`forum_members_user\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_43659f679ff125e88c07ae5670\` ON \`forum_members_user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`forum_members_user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`discussion_group\`
        `);
    await queryRunner.query(`
            DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`user\`
        `);
    await queryRunner.query(`
            DROP TABLE \`message\`
        `);
    await queryRunner.query(`
            DROP TABLE \`message_type\`
        `);
    await queryRunner.query(`
            DROP TABLE \`comment\`
        `);
    await queryRunner.query(`
            DROP TABLE \`forum\`
        `);
    await queryRunner.query(`
            DROP TABLE \`post\`
        `);
    await queryRunner.query(`
            DROP TABLE \`like\`
        `);
  }
}
