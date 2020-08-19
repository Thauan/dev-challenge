import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('members', (table: Knex.TableBuilder) => {
        table.bigIncrements('id').primary().unsigned();
        table.integer('user_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('users');
        table.string('thumbnailHd');
        table.string('pin_code');
        table.string('birthday');
    });

}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('members');
}

