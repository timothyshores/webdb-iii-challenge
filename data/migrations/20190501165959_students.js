exports.up = function (knex, Promise) {
    return knex.schema.createTable('students', tbl => {
        // primary key
        tbl.increments();
        //name field - required 
        tbl.string('name', 128).notNullable();
        // cohort ID
        tbl
            .integer('cohort_id')
            .unsigned()
            .references('id')
            .inTable('cohorts');
        // Time stamps
        tbl.timestamps(true, true);
    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('students');
};