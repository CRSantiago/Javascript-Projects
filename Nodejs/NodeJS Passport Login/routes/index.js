const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
const fs = require('fs');
const budgetData = require('../data.json');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard', {
        user: req.user,
        budgetData: budgetData.allItems
    })
);

router.route('/post').post((req, res) => {
    let expenses = req.body;
    let data = JSON.stringify(expenses);
    fs.writeFileSync('data.json', data);
    res.send(req.body);
});

module.exports = router;