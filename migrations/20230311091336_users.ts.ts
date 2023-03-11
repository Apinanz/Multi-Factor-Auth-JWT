import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTableIfNotExists(
        "users",
        table => {
            table.uuid("id").primary().notNullable();
            table.string("name").notNullable();
            table.string("email").notNullable();
            table.string("password").notNullable();
            table.string("multi_factor").notNullable().defaultTo(false);
            table.string("secret")
            table.dateTime("created_at").notNullable();
            table.dateTime("updated_at").notNullable();
        }
    )
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTable("users");
}

