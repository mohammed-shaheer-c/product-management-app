const categoryModal = require('../models/category.model')
exports.addCategory = async(req, res)=>
    {
        try{
            let result = await categoryModal.addNewProductCategory(req.body);
            if(result){
                return res.status(200).send
                ({
                    status : true,
                    code : 200,
                    message : 'Success fully added.',
                });  
            }else{
                return res.status(200).send
                ({
                    status : false,
                    code : 400,
                    message : 'Allready exist.'
                });
            }
        }catch(error){
            return res.status(200).send
            ({
                status : false,
                code : 500,
                message : 'Internal server error.'
            });
        }

};


// Function for get all categories
exports.getAllProductCategories = async(req, res)=>
    {
        try{
            let result = await categoryModal.getAllCategoriesWithSubCategories();

            if(result){
                return res.status(200).send
                ({
                    status : true,
                    code : 200,
                    message : 'Success fully fetched.',
                    data : result.data
                });  
            }
        }catch(error){
            return res.status(200).send
            ({
                status : false,
                code : 500,
                message : 'Internal server error.'
            });
        }

};
