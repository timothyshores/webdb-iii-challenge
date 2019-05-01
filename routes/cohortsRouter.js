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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const message404 = { message: `Cohort id: ${id}  not found` }

    db('cohorts')
        .where({ id: id })
        .first()
        .then(cohort => {
            cohort === undefined
                ? res.status(404).json(message404)
                : res.status(200).json(cohort)
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const message201 = { message: 'Cohorts requires a valid name' }

    name && (typeof name === 'string')
        ? db('cohorts')
            .insert(req.body, 'id')
            .then(results => res.status(201).json(results))
            .catch(err => res.status(500).json(err))
        : res.status(201).json(message201)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Cohort id: ${id} was successfully deleted` }
    const message404 = { message: `Cohort id: ${id} does not exist` }

    db('cohorts')
        .where({ id: id })
        .del()
        .then(count => {
            count > 0
                ? res.status(200).json(message200)
                : res.status(404).json(message404)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.put('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Cohort id: ${id} was successfully updated` }
    const message404 = { message: `Cohort id: ${id} does not exist` }

    db('cohorts')
        .where({ id: id })
        .update(req.body)
        .then(count => {
            count > 0
                ? res.status(200).json(message200)
                : res.status(404).json(message404)
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

module.exports = router;