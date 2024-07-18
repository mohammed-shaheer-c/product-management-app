const ProductSchema = require('../mongo/schemas/product.schema')
const {generateProductCode} = require('../utility/apiCommenController');
const constants = require('../utility/constants');

module.exports = class category
{
    // addNewProduct
    static async addNewProduct(requestBody)
    {
        try
        {
            const { title, variants, subCategory, description, images } = requestBody;
            console.log("images",images);
            let filterSuccessFileName = images.filter((item)=>item.status == 'success').map(image => ({
                filename: image.file
              }));
            const productCode = generateProductCode(title);

            const newProduct = new ProductSchema({
                title,
                productCode,
                variants: JSON.parse(variants),
                subCategory,
                description,
                images : filterSuccessFileName,
              });
          
            await newProduct.save();

            return true

        }
        catch(error)
        {
            console.log("eroor",error.message);
        }
    };

    // edit Product
    static async editProduct(requestBody)
    {
        try
        {
            console.log("requestbody",requestBody);
            let { productId, title, variants, subCategory, description, images } = requestBody;
        
            // Find the product by its ID
            let product = await ProductSchema.findById(productId);
            if(!product){
                return {message : "PRODUCTNOTFOUND"}
            }
  console.log("images",images);

            product.title = title || product.title;
            product.productCode = generateProductCode(title) || product.productCode;
            product.variants = variants || product.variants;
            product.subCategory = subCategory || product.subCategory;
            product.description = description || product.description;
            product.images = images.map(image => {
                return {
                    ...image,
                    filename: prependBaseUrlToFilename(image.filename)
                };
            });
            
            await product.save();

            return { message: 'Product updated successfully'}

        }
        catch(error)
        {
            console.log("eroor ->",error.message);
        }
    };

    // edit Product
    static async getParticularProduct(productId)
    {
        try
        {
    
        
            // Find the product by its ID
            let product = await ProductSchema.findById(productId);
            if(!product){
                return {message : "PRODUCTNOTFOUND"}
            }
            for(let item of product.images){
                item.filename = `${process.env.APP_ENDPOINT}${constants.imageLocations.product.view_path}/${item.filename}`
            }

            return { message: 'product fetched successfully',data : product}

        }
        catch(error)
        {
            console.log("eroor",error.message);
        }
    };

    static async getAllProduct(requestBody) {
        try {
            const { name, subCategory, page, limit } = requestBody;
            
            let filter = {};
    
            // If name is provided, add it to the filter
            if (name) {
                filter.title = { $regex: new RegExp(name, 'i') }; // Case-insensitive search
            }
    
            // If subCategory is provided and it's an array, use $in operator
            if (subCategory && Array.isArray(subCategory) && subCategory.length > 0) {
                filter.subCategory = { $in: subCategory };
            }
    
            // Calculate the number of documents to skip
            const skip = (page - 1) * limit;
            
            const products = await ProductSchema.find(filter)
                .populate('subCategory', 'title')
                .skip(skip)
                .limit(parseInt(limit));
    
            // Prepend APP_ENDPOINT to image filenames
            for (let i = 0; i < products.length; i++) {
                for (let item of products[i]?.images) {
                    item.filename = `${process.env.APP_ENDPOINT}${constants.imageLocations.product.view_path}/${item.filename}`;
                }
            }
    
            return { message: 'products fetched successfully', data: products };
        } catch (error) {
            console.log("error", error.message);
            throw error; // Rethrow the error to handle it properly in the caller
        }
    }
    
};

function prependBaseUrlToFilename(filename) {
    const baseUrl = process.env.APP_ENDPOINT + constants.imageLocations.product.view_path;
    if (filename.startsWith(baseUrl)) {
        return filename;
    }
    return `${baseUrl}/${filename}`;
}