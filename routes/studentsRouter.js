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

router.get('/:id', (req, res) => {
    const id = req.params.id;
    const message404 = { message: `Student id: ${id}  not found` }

    db('students')
        .where({ id: id })
        .first()
        .then(student => {
            student === undefined
                ? res.status(404).json(message404)
                : res.status(200).json(student)
        })
        .catch(err => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const name = req.body.name;
    const cohort_id = req.body.cohort_id;
    const message201 = { message: 'Student requires a valid name and cohort_id' }

    name && (typeof name === 'string') && cohort_id
        ? db('students')
            .insert({ name, cohort_id }, 'id')
            .then(results => res.status(201).json(results))
            .catch(err => res.status(500).json(err))
        : res.status(201).json(message201)
});

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    const message200 = { message: `Student id: ${id} was successfully deleted` }
    const message404 = { message: `Student id: ${id} does not exist` }

    db('students')
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
    const message200 = { message: `Student id: ${id} was successfully updated` }
    const message404 = { message: `Student id: ${id} does not exist` }

    db('students')
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