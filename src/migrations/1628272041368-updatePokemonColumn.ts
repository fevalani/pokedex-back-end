import {MigrationInterface, QueryRunner} from "typeorm";

export class updatePokemonColumn1628272041368 implements MigrationInterface {
    name = 'updatePokemonColumn1628272041368'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons" DROP COLUMN "inMyPokemons"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "FK_05586f00425c78322bf644eb52a"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "FK_ed3d45c1529b75ca03bd4c3aef2"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "REL_05586f00425c78322bf644eb52"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "REL_ed3d45c1529b75ca03bd4c3aef"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "FK_05586f00425c78322bf644eb52a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "FK_ed3d45c1529b75ca03bd4c3aef2" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "FK_ed3d45c1529b75ca03bd4c3aef2"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" DROP CONSTRAINT "FK_05586f00425c78322bf644eb52a"`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "REL_ed3d45c1529b75ca03bd4c3aef" UNIQUE ("pokemonId")`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "REL_05586f00425c78322bf644eb52" UNIQUE ("userId")`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "FK_ed3d45c1529b75ca03bd4c3aef2" FOREIGN KEY ("pokemonId") REFERENCES "pokemons"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemons_users" ADD CONSTRAINT "FK_05586f00425c78322bf644eb52a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pokemons" ADD "inMyPokemons" boolean NOT NULL`);
    }

}
