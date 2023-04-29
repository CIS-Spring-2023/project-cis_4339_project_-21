const express = require('express')
const router = express.Router()

const org = process.env.ORG

// Importing the Service model
const { Service } = require('../models/models') // Adjust the path as necessary

// GET all services
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.find({ org: org });
    res.json(services);
  } catch (error) {
    next(error);
  }
})

// POST new service
router.post('/', (req, res, next) => {
  const newService = new Service({
    org: org,
    ...req.body
  });

  newService.save((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// PUT update service active to false
router.put('/deactivate/:id', async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { active: false }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
})

// PUT update service active to true
router.put('/activate/:id', async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { active: true }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
})

// PUT update service name
router.put('/updatename/:id', async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { name: req.body.name }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
})


// PUT update service description
router.put('/updatedescription/:id', async (req, res, next) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { description: req.body.description }, { new: true });
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
})


module.exports = router
