const router = require('express').Router();
let Hours = require('../models/hours.model');

router.route('/').get((req, res) => {
    Hours.find()
        .then(hours => res.json(hours))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const hoursCompleted = Number(req.body.hoursCompleted);
    const date = Date.parse(req.body.date);

    const newHours = new Hours({
        firstname,
        lastname,
        hoursCompleted,
        date
    });

    newHours.save()
        .then(() => res.json('Hours added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Hours.findById(req.params.id)
        .then(hours => res.json(hours))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;