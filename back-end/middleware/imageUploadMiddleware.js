const { fileUpload } = require('../utility/apiCommenController');
const constants = require('../utility/constants');

exports.imageUpload = async (req, res, next) => {
    try {

       if (req.url === '/edit/product' && !req.files?.images) {
            return next(); // Continue to the next middleware if no images are required
        }

        if (!req.files || !req.files.images) {
            return res.status(200).send({ message: 'No images were uploaded.' });
        }
  
        const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

        const result = await fileUpload(images, constants.imageLocations.product.upload_path);
        if(result?.[0]?.message == 'INVALIDFORMAT'){
            return res.status(200).send({ message: 'Only jpg & png image allwed.' });
        }
        req.body.images = result;
        next();
    } catch (err) {
        console.error('Image upload error:', err);
        res.status(200).send({ message: 'Internal server error' });
    }
};
