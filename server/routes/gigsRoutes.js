import express from 'express';
import tokenVerify from '../middleware/tokenVerify.js';
import { addGig, addReview, checkGigOrder, getSingleGig, getUserGigs, searchGig, updateGig } from '../controllers/gigsController.js';
import { gigImagesMulter } from '../utils/multer.js';

const router = express.Router();

// router.use(tokenVerify);
// create route
router.route('/').get(tokenVerify, getUserGigs).post(tokenVerify, gigImagesMulter, addGig);
router.route('/search-gig').get(searchGig);
router.route('/:id').get(getSingleGig).put(gigImagesMulter, updateGig).patch(gigImagesMulter, updateGig);
router.route('/check-gig-order/:gigId').get(tokenVerify, checkGigOrder);
router.route('/add-review/:gigId').post(tokenVerify, addReview);

// export default router
export default router;
