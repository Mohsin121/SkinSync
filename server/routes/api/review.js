const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const Order = require('../../models/Order');
const { auth } = require('../../middlewares');
const Product = require('../../models/Product');
const Review = require('../../models/Review');

const { ResponseHandler } = require('../../utils');

router.post('/create', auth.required, auth.user, async (req, res) => {
  try {
    const {  rating,text, product} = req.body;
    const userId = req.user._id

    const findReview = await Review.findOne({user:userId, product:product})
    if(findReview){
      return ResponseHandler.badRequest(res, "Review already submitted");

    }
    // Create new order
    const review = new Review({
      user:userId,
      text,
      rating,
      product,
    });
    await review.save();
  
    return ResponseHandler.ok(res, review, 'Review created successfully');
  } catch (error) {
    console.error('Error creating review:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to create review');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.id });

    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = reviews.length > 0 ? (totalRating / reviews.length).toFixed(1) : 0;

    return ResponseHandler.ok(res, {
      averageRating: Number(averageRating),
      totalReviews: reviews.length,
      reviews
    });
  } catch (error) {
    console.error('Error fetching user reviews:', error);
    return ResponseHandler.badRequest(res, error.message || 'Failed to fetch user reviews');
  }
});


module.exports = router;
