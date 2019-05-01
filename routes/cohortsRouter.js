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
    db('cohorts')
        .then(name => res.status(200).json(name))
        .catch(err => res.status(500).json(err));
});

module.exports = router;