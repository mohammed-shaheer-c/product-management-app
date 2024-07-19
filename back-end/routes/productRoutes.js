const productController  = require('../controllers/productController')
const middleware = require('../middleware/imageUploadMiddleware')

module.exports = function(app)
{

    // add product
    app.post('/add/product',
        middleware.imageUpload,
        productController.addProduct
    );

    // edit product
    app.post('/edit/product',
        productController.editProduct
    );

    
    // get particular product
    app.get('/product/:id',
        productController.getParticularProduct
    );

    // get particular product
    app.post('/packages',
        productController.getAllProduct
    );
}