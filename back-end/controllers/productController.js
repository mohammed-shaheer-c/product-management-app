const productModal = require('../models/product.modal')
exports.addProduct = async(req, res)=>
    {
        try{
            let result = await productModal.addNewProduct(req.body);
            console.log(result);
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
                    message : 'Faild.'
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

// Function for edit product
exports.editProduct = async(req, res)=>
    {
        try{
            let result = await productModal.editProduct(req.body);
            if(result.message == 'PRODUCTNOTFOUND'){
                return res.status(200).send
                ({
                    status : false,
                    code : 400,
                    message : 'Product not found.'
                });
  
            }else{
                return res.status(200).send
                ({
                    status : true,
                    code : 200,
                    message : 'Product updated successfully.',
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

// Function for get particular product
exports.getParticularProduct = async(req, res)=>
    {
        try{
            let result = await productModal.getParticularProduct(req.params.id);
            if(result.message == 'PRODUCTNOTFOUND'){
                return res.status(200).send
                ({
                    status : false,
                    code : 400,
                    message : 'Product not found.'
                });
  
            }else{
                return res.status(200).send
                ({
                    status : true,
                    code : 200,
                    message : 'Product fetched successfully.',
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


exports.getAllProduct = async(req, res)=>
    {
        try{
            let result = await productModal.getAllProduct(req.body);

                return res.status(200).send
                ({
                    status : true,
                    code : 200,
                    message : 'Products fetched successfully.',
                    data : result.data,
                    count : result.count
                }); 
        }catch(error){
            return res.status(200).send
            ({
                status : false,
                code : 500,
                message : 'Internal server error.'
            });
        }

};