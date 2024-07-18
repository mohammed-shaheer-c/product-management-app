const subCategoryModal = require('../models/subCategory.model')
exports.addSubCategory = async(req, res)=>
    {
        try{
            let response = await subCategoryModal.addNewSubCategory(req.body);
            if(response){
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
                    message : 'Allready exist subcategory.'
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

