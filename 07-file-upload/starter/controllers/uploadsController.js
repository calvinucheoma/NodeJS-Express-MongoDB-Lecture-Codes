const path = require('path'); //always place the path first before any other imports else none of your error codes except the no file uploaded error would work. Basically the server would accept any type of file and also large files
const Product = require('../models/Product');
const { StatusCodes } = require('http-status-codes');
const CustomError = require('../errors');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

//upload images to your local server
const uploadProductImageLocal = async (req, res) => {
  //check if file exists
  if (!req.files) {
    throw new CustomError.BadRequestError('No file uploaded');
  }

  const productImage = req.files.image;

  //check format
  if (!productImage.mimetype.startsWith('image')) {
    throw new CustomError.BadRequestError('Please upload image');
  }

  //check size
  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomError.BadRequestError(
      'Please upload image smaller than 1kB'
    );
  }

  //   console.log(req.files);
  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${productImage.name}`
  );
  await productImage.mv(imagePath);
  return res
    .status(StatusCodes.OK)
    .json({ image: { src: `/uploads/${productImage.name}` } });
};

//upload images to a cloud platform called Cloudinary
const uploadProductImage = async (req, res) => {
  //   console.log(req.files.image); //we see our image object but now with a new property called tempFilePath because of the property we specified in the fileUpload method in appJS. This creates a temporary folder called 'tmp' in our root directory

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: 'node-image-file-upload-tutorial',
    }
  );
  //   console.log(result);
  fs.unlinkSync(req.files.image.tempFilePath); //to remove the image from our tmp folder after upload
  return res.status(StatusCodes.OK).json({ image: { src: result.secure_url } });
};

module.exports = {
  uploadProductImage,
};
