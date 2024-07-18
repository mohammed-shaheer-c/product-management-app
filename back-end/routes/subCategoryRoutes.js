const subCategoryController  = require('../controllers/subCategoryController')

module.exports = function(app)
{

    // add category
    app.post('/add/sub-category',
        subCategoryController.addSubCategory
    );
}