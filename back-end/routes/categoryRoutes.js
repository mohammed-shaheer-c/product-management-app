const categoryController  = require('../controllers/categoryController')

module.exports = function(app)
{

    // add category
    app.post('/add/category',
        categoryController.addCategory
    );
    // add category
    app.get('/categories',
        categoryController.getAllProductCategories
    );
}