import prisma from '../config/prisma.js';

export const getProductReviews = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'El producto solicitado no fue encontrado' });
    }

    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' }
    });

    const totalRating = reviews.reduce((acc, r) => acc + r.rating, 0);
    const averageRating = reviews.length > 0 
      ? Number((totalRating / reviews.length).toFixed(2)) 
      : 0;

    return res.json({
      productId,
      averageRating,
      totalReviews: reviews.length,
      reviews
    });
  } catch (error) {
    next(error);
  }
};

export const createReview = async (req, res, next) => {
  try {
    const productId = req.params.id;

    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({ error: 'El producto solicitado no fue encontrado' });
    }

    const newReview = await prisma.review.create({
      data: {
        ...req.body,
        productId
      }
    });

    return res.status(201).json(newReview);
  } catch (error) {
    next(error);
  }
};