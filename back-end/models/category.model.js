const CategorySchema = require('../mongo/schemas/category.schema')
const SubCategorySchema = require('../mongo/schemas/subCategory.schema')

module.exports = class category
{
    // addNewProductCategory
    static async addNewProductCategory(requestBody)
    {
        try
        {
           const {categoryName} = requestBody;
           let nameExist = await CategorySchema.find({name : categoryName})
           if(nameExist.length !== 0){
                return false;
           }

            // Create a new category
            const newCategory = new CategorySchema({
                name: categoryName,
            });

            // Save the category to the database   
            await newCategory.save();

            return true

        }
        catch(error)
        {
            console.log("eroor",error.message);
        }
    };

    // addNewProductCategory
    static async getAllCategoriesWithSubCategories()
    {
        try
        {
            const categories = await CategorySchema.find().lean();
            const subCategories = await SubCategorySchema.find().lean();
      
            // Combine categories and their sub-categories
            const categoriesWithSubCategories = categories.map(category => ({
              ...category,
              subCategories: subCategories.filter(subCategory => 
                subCategory.category.toString() === category._id.toString())
            }));
            return {message : "success", data : categoriesWithSubCategories}

        }
        catch(error)
        {
            console.log("eroor",error.message);
        }
    };

};