const express = require('express')
const router = express.Router()

const org = process.env.ORG

// importing data model schemas
const { orgs } = require('../models/models')

// GET org
router.get('/', (req, res, next) => {
  orgs.findById(org, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

router.get('/getorg', async (req, res, next) => {
  try {
    // Find all documents in the 'org' collection
    const allOrgs = await orgs.find({});
    res.json(allOrgs);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});


// Route handler for POST request
// POST new event
router.post('/', (req, res, next) => {
  const newEvent = req.body
  newEvent.org = org
  orgs.create(newEvent, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

module.exports = router
