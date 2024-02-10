import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma/index.js';
import { cloudDelete, cloudUpload, findCloudinaryPublicId } from '../utils/cloudinary.js';

/**
 * @DESC Get User gigs
 * @ROUTE /api/v1/gigs
 * @method GET
 * @access public
 */
export const getUserGigs = asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.me.id }, include: { gigs: true } });

  res.status(200).json({ gigs: user.gigs, message: 'Gig get Successful' });
});

/**
 * @DESC Edit Gig
 * @ROUTE /api/v1/gigs/:id
 * @method GET
 * @access public
 */
export const getSingleGig = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const gig = await prisma.gigs.findUnique({ where: { id }, include: { createdBy: true, reviews: { include: { reviewer: true } } } });

  if (!gig) return res.status(400).json({ message: 'Gig not found' });

  const userWithGigs = await prisma.user.findUnique({
    where: { id: gig?.createdBy.id },
    include: {
      gigs: {
        include: { reviews: true }
      }
    }
  });

  const totalReviews = userWithGigs.gigs.reduce((acc, gig) => acc + gig.reviews.length, 0);

  const averageRating = (userWithGigs.gigs.reduce((acc, gig) => acc + gig.reviews.reduce((sum, review) => sum + review.rating, 0), 0) / totalReviews).toFixed(1);

  res.status(200).json({ gig: { ...gig, totalReviews, averageRating }, message: 'Gig Fetch successful' });
});

/**
 * @DESC Add Gig
 * @ROUTE /api/v1/gigs
 * @method POST
 * @access public
 */
export const addGig = asyncHandler(async (req, res) => {
  const { title, description, category, deliveryTime, revisions, features, price, shortDesc } = req.body;

  console.log(req.me);

  // Form Validation
  if (!title || !description || !category || !deliveryTime || !revisions || !features || !price || !shortDesc) {
    return res.status(400).json({ message: 'Gigs info is required' });
  }
  const allFeatures = features.split(',');

  //   <!-- file upload -->
  let gigImages = [];
  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      const url = await cloudUpload(req.files[i].path, 'Fiverr/Gig')
        .then((res) => {
          gigImages.push(res?.secure_url);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  const gig = await prisma.gigs.create({
    data: {
      title,
      description,
      deliveryTime: parseInt(deliveryTime),
      category,
      features: allFeatures,
      price: parseInt(price),
      shortDesc,
      images: gigImages,
      revisions: parseInt(revisions),
      createdBy: { connect: { id: req?.me?.id } }
    }
  });

  res.status(201).json({ gig, message: 'Successfully created the gig' });
});

/**
 * @DESC Update Gig
 * @ROUTE /api/v1/gigs/id
 * @method POST
 * @access public
 */
export const updateGig = asyncHandler(async (req, res) => {
  const { title, description, category, deliveryTime, revisions, features, price, shortDesc, oldImage } = req.body;

  const findGig = await prisma.gigs.findUnique({ where: { id: req.params.id } });

  if (!findGig) return res.status(400).json({ message: 'Gig not found' });

  // gig image update
  let gigImages = [...findGig.images];

  gigImages = oldImage.split(',');

  const notMatchedImage = findGig?.images?.filter((item) => !gigImages.includes(item));

  if (notMatchedImage.length > 0) {
    notMatchedImage?.map(async (url) => {
      const publicId = findCloudinaryPublicId(url);
      await cloudDelete(publicId);
    });
  }

  if (req.files) {
    for (let i = 0; i < req.files.length; i++) {
      await cloudUpload(req.files[i].path, 'Fiverr/Gig')
        .then((res) => {
          gigImages.push(res?.secure_url);
        })
        .catch((error) => {
          console.log(error.message);
        });
    }
  }

  const updateGig = await prisma.gigs.update({
    where: { id: req.params.id },
    data: {
      title: title || findGig.title,
      description: description || findGig.description,
      deliveryTime: parseInt(deliveryTime) || findGig.deliveryTime,
      category: category || findGig.category,
      features: features ? features?.split(',') : findGig.features,
      price: parseInt(price) || findGig.price,
      shortDesc: shortDesc || findGig.shortDesc,
      images: gigImages,
      revisions: parseInt(revisions) || findGig.revisions
    }
  });

  res.status(201).json({ gig: updateGig, message: 'Gig Updated Successfully' });
});

/**
 * @DESC Search Gig
 * @ROUTE /api/v1/gigs/id
 * @method POST
 * @access public
 */
export const searchGig = asyncHandler(async (req, res) => {
  if (!req.query.searchTerm && !req.query.category) return res.status(400).json({ message: 'Search Term or Category is required' });

  const gigs = await prisma.gigs.findMany(createSearchQuery(req.query.searchTerm, req.query?.category));

  res.status(200).json({ gigs, message: 'Gig search Successful' });
});

const createSearchQuery = (searchTerm, category) => {
  const query = {
    where: { OR: [] },
    include: {
      createdBy: true,
      reviews: {
        include: {
          reviewer: true
        }
      }
    }
  };

  if (searchTerm) {
    query.where.OR.push({ title: { contains: searchTerm, mode: 'insensitive' } });
  }

  if (category) {
    query.where.OR.push({ category: { contains: category, mode: 'insensitive' } });
  }

  return query;
};

export const checkGigOrder = asyncHandler(async (req, res) => {
  if (!req.params.gigId) return res.status(400).json({ message: 'Gig id is required!' });

  const hasUserOrderedGig = await checkOrder(req.me.id, req.params.gigId);

  if (!hasUserOrderedGig) return res.status(500).json({ message: 'Internal server error' });

  res.status(200).json({ hasUserOrderedGig: hasUserOrderedGig ? true : false });
});

const checkOrder = async (userId, gigId) => {
  try {
    const hashUserOrderGig = await prisma.order.findFirst({
      where: {
        buyerId: userId,
        gigId: gigId,
        isCompleted: true
      }
    });
    return hashUserOrderGig;
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * @DESC add Review
 * @ROUTE /api/v1/gigs/id
 * @method POST
 * @access public
 */
export const addReview = asyncHandler(async (req, res) => {
  if (!req.params.gigId) return res.status(400).json({ message: 'Gig id is required' });

  const hasUserOrderedGig = await checkOrder(req.me.id, req.params.gigId);

  if (!hasUserOrderedGig) return res.status(500).json({ message: 'You need to purchase the gig in order to add review' });

  if (!req.body.reviewText || !req.body.rating) return res.status(400).json({ message: 'Review Text or Rating is required!' });

  const newReview = await prisma.reviews.create({
    data: {
      rating: req.body.rating,
      reviewText: req.body.reviewText,
      reviewer: { connect: { id: req.me.id } },
      gig: { connect: { id: req.params.gigId } }
    },
    include: {
      reviewer: true
    }
  });

  res.status(201).json({ review: newReview, message: 'New review created' });
});
