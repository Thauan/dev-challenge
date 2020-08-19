import * as Knex from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('employers', (table: Knex.TableBuilder) => {
        table.bigIncrements('id').primary().unsigned();
        table.string('employer_name');
        table.string('employer_code');
        table.integer('member_count');
        table.string('thumbnail');
        table.date('register_date')
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists('employers');
}

