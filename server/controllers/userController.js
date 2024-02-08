import asyncHandler from 'express-async-handler';
import { prisma } from '../prisma/index.js';
import bcrypt from 'bcrypt';
import { cloudDelete, cloudUpload, findCloudinaryPublicId } from '../utils/cloudinary.js';

/**
 * @DESC Update User
 * @ROUTE /api/v1/user/userUpdate
 * @method POST
 * @access public
 */
export const userUpdate = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await prisma.user.findUnique({ where: { id }, include: { gigs: true } });

  if (!user) return res.status(400).json({ message: 'User not found' });

  if (req.body.email) {
    const findByEmail = await prisma.user.findUnique({ where: { email: req.body?.email } });

    if (findByEmail && findByEmail.id !== user.id) return res.status(400).json({ message: 'Email already taken!' });
  }

  let hashPassword = user.password;
  if (req.body.password) {
    hashPassword = await bcrypt.hash(req.body.password, 10);
  }

  // Status Update
  let status = user.status;
  if (req.body.status == 'true' || req.body.status == true) {
    status = true;
  } else if (req.body.status == 'false' || req.body.status == false) {
    status = false;
  }
  // Trash Update
  let trash = user.trash;
  if (req.body.trash == 'true' || req.body.trash == true) {
    trash = true;
  } else if (req.body.trash == 'false' || req.body.trash == false) {
    trash = false;
  }
  // isProfileInfoSet Update
  let isProfileInfoSet = user.isProfileInfoSet;
  if (req.body.isProfileInfoSet == 'true' || req.body.isProfileInfoSet == true) {
    isProfileInfoSet = true;
  } else if (req.body.isProfileInfoSet == 'false' || req.body.isProfileInfoSet == false) {
    isProfileInfoSet = false;
  }

  // <!-- photo update -->
  let profileImage = user.profileImage;
  if (req?.file) {
    await cloudUpload(req?.file.path, 'Fiverr/profile')
      .then((res) => {
        profileImage = res?.secure_url;
      })
      .catch((error) => {
        console.log(error.message);
      });

    if (user.profileImage) {
      const publicId = findCloudinaryPublicId(user.profileImage);
      await cloudDelete(publicId);
    }
  }

  //   <!-- Update User -->
  const updateUser = await prisma.user.update({
    where: { id },
    data: {
      username: req?.body?.username || user?.username,
      email: req.body?.email || user?.email,
      password: hashPassword,
      fullName: req.body?.fullName || user?.fullName,
      description: req.body?.description || user.description,
      profileImage,
      isProfileInfoSet,
      status,
      trash
    }
  });

  updateUser.password = undefined;

  res.status(200).json({ user: updateUser, message: 'Update Successfully' });
});
