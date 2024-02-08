import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: 'do6dt1ot2',
  api_key: '959856998471536',
  api_secret: 'e0JwQpDr3fvZcmEfcqqm4zLhoD0'
});

// <!-- upload image -->
export const cloudUpload = async (filePath, foldername) => {
  const data = await cloudinary.uploader.upload(filePath, { folder: foldername });

  return data;
};

// <!-- delete image -->
export const cloudDelete = async (publicId) => {
  await cloudinary.uploader.destroy(publicId, { invalidate: true });
};

// <!-- find public id form coudinry image link -->

export const findCloudinaryPublicId = (url) => {
  const data = url.split('/');
  const parentFolder = data[url.split('/').length - 3];
  const subFolder = data[url.split('/').length - 2];
  const publicId = data[url.split('/').length - 1].split('.')[0];
  return `${parentFolder}/${subFolder}/${publicId}`;
};
