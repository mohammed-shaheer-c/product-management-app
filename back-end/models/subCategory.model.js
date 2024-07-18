


const SubCategorySchema = require('../mongo/schemas/subCategory.schema')

module.exports = class subcategory
{
    // addNewSubCategory
    static async addNewSubCategory(requestBody)
    {
        try
        {
           const {categorId, subCategoryName} = requestBody;
     
            // Create a new category
            const newSubCategory = new SubCategorySchema({
                name: subCategoryName,
                category : categorId
            });

            // Save the sub category to the database   
            await newSubCategory.save();

            return true

        }
        catch(error)
        {
            console.log("eroor",error.message);
        }
    };

};




