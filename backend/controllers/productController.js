const asyncHandler = require('express-async-handler');
const Cake = require('../models/cakeModel');


// @desc Fetch all products
// @route GET /api/products

exports.getCakes = asyncHandler(async (req, res) => {
    const cakes = await Cake.find({})

    res.json(cakes)
})

// @desc      Fetch single product
// route      GET /api/products/:id
// @access    Public 
exports.getCakeById = asyncHandler(async (req, res) => {
    const cake = await Cake.findById(req.params.id);

    if (cake) {
        res.json(cake)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})



