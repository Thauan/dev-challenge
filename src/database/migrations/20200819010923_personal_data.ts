import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('personal_data', (table: Knex.TableBuilder) => {
        table.bigIncrements('id').primary().unsigned();
        table.integer('member_id')
        .unsigned()
        .index()
        .references('id')
        .inTable('members');
        table.string('father');
        table.string('mother');
        table.boolean('hand');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('personal_data'); 
}

