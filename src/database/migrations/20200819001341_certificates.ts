import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('certificates', (table: Knex.TableBuilder) => {
        table.bigIncrements('id').primary().unsigned();
        table.string('initial_date');
        table.string('final_date');
        table.integer('time');
        table.integer('member_code');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('certificates');
}

