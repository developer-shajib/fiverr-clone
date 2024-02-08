import multer from 'multer';

// multer config
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + Math.floor(Math.random() * 1000000) + '_' + file.fieldname);
  }
});

export const profileMulter = multer({ storage }).single('profile');
export const gigImagesMulter = multer({ storage }).array('gigImages', 5);
