const knex = require('knex');
const router = require('express').Router();

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/cohorts.db3'
    },
    useNullAsDefault: true
};

const db = knex(knexConfig);

router.get('/', (req, res) => {
    db('students')
        .then(name => res.status(200).json(name))
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const cohort_id = req.body.cohort_id;
    const message201 = { message: 'Student requires a valid name and cohort_id' }

    name && (typeof name === 'string') && cohort_id
        ? db('students')
            .insert({ name, cohort_id}, 'id')
            .then(results => res.status(201).json(results))
            .catch(err => res.status(500).json(err))
        : res.status(201).json(message201)
});

module.exports = router;