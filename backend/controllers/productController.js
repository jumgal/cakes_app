const asyncHandler = require('express-async-handler');
const Cake = require('../models/cakeModel');


// @desc Fetch all cakes
// @route GET /api/cakes

exports.getCakes = asyncHandler(async (req, res) => {
    const cakes = await Cake.find({})

    res.json(cakes)
})

// @desc      Fetch single cake
// route      GET /api/cakes/:id
// @access    Public 
exports.getCakeById = asyncHandler(async (req, res) => {
    const cake = await Cake.findById(req.params.id);

    if (cake) {
        res.json(cake)
    } else {
        res.status(404)
        throw new Error('Cake not found')
    }
})



// @route   DELETE /api/cakes/:id
// @access  Private/Admin
exports.deleteCake = asyncHandler(async (req, res) => {
    const cake = await Cake.findById(req.params.id)

    if (cake) {
        await cake.remove()
        res.json({ message: 'Cake removed' })
    } else {
        res.status(404)
        throw new Error('Cake not found')
    }
})


// @route   POST /api/cakes
// @access  Private/Admin
exports.createCake = asyncHandler(async (req, res) => {
    const cake = new Cake({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample brand',
        category: 'Sample category',
        countInStock: 0,
        numReviews: 0,
        description: 'Sample description',
    })

    const createdCake = await cake.save()
    res.status(201).json(createdCake)
})

// 
// @route   PUT /api/cakes/:id
// @access  Private/Admin
exports.updateCake = asyncHandler(async (req, res) => {
    const {
        name,
        price,
        description,
        image,
        brand,
        category,
        countInStock,
    } = req.body

    const cake = await Cake.findById(req.params.id)

    if (cake) {
        cake.name = name
        cake.price = price
        cake.description = description
        cake.image = image
        cake.brand = brand
        cake.category = category
        cake.countInStock = countInStock

        const updatedCake = await cake.save()
        res.json(updatedCake)
    } else {
        res.status(404)
        throw new Error('Cake not found')
    }
})


// @route   POST /api/cakes/:id/reviews
// @access  Private
exports.createCakeReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body

    const cake = await Cake.findById(req.params.id)

    if (cake) {
        const alreadyReviewed = cake.reviews.find(
            (r) => r.user.toString() === req.user._id.toString()
        )

        if (alreadyReviewed) {
            res.status(400)
            throw new Error('Cake already reviewed')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id,
        }

        cake.reviews.push(review)

        cake.numReviews = cake.reviews.length

        cake.rating =
            cake.reviews.reduce((acc, item) => item.rating + acc, 0) /
            cake.reviews.length

        await cake.save()
        res.status(201).json({ message: 'Review added' })
    } else {
        res.status(404)
        throw new Error('Cake not found')
    }
})


// @route   GET /api/cakes/top
// @access  Public
exports.getTopCakes = asyncHandler(async (req, res) => {
    const cakes = await Cake.find({}).sort({ rating: -1 }).limit(3)

    res.json(cakes)
})




