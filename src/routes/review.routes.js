import { Router } from 'express';
import { getProductReviews, createReview } from '../controllers/review.controller.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createReviewSchema, productIdParamSchema } from '../schemas/review.schema.js';

const router = Router({ mergeParams: true });

router.get('/:id/reviews', validate(productIdParamSchema, 'params'), getProductReviews);
router.post(
  '/:id/reviews',
  validate(productIdParamSchema, 'params'),
  validate(createReviewSchema, 'body'),
  createReview
);

export default router;