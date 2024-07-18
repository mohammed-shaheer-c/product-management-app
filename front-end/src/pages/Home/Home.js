import React,{useEffect, useMemo, useState,useContext } from 'react';
import SideBar from '../../components/SideBar/SideBar';
import ListingProbox from '../../components/ListingProbox/ListingProbox';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb ';
import  AddProductPopup  from '../../components/common/OpenPopUp/AddProductPopup/AddProductPopup'
import AddSubCategoryPopup from '../../components/common/OpenPopUp/AddSubCategoryPopup/AddSubCategoryPopup';
import AddCategoryPopup from '../../components/common/OpenPopUp/AddCategoryPopup/AddCategoryPopup';
import {addCategory, getCategoryWithSubCategory, addSubCategory} from '../../services/categoryService'
import {addNewProduct,getAllProductWithSearch} from '../../services/productService'
import { SearchFilterContext } from '../../context/SearchFilterContext';

function Home() {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [categoryWithSubCategory, setCategoryWithSubCategory] = useState([]);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showSubCategoryPopup, setSubCategoryPopup] = useState(false);
  const { searchFilterValues, setSearchFilterValues } = useContext(SearchFilterContext);
  const [page, setPage] = useState(1);
  const [products, setProducts]  = useState([]);


  // Function for add product popup
  const handleAddProductPopUpShow = () => setShowAddProductPopup(true);
  const handleAddProductPopUpClose = () => setShowAddProductPopup(false);

  // Function category popup
  const handleCategoryPopUpShow = () => setShowCategoryPopup(true);
  const handleCategoryPopUpClose = () => setShowCategoryPopup(false);

  // Function sub category popup
  const handlSubCategoryPopUpShow = () => setSubCategoryPopup(true);
  const handleSubCategoryPopUpClose = () => setSubCategoryPopup(false);

  // Fetching all sub categories
  const subCategories = useMemo(() => {
    return categoryWithSubCategory.reduce((acc, category) => {
        if (category.subCategories && category.subCategories.length > 0) {
            acc.push(...category.subCategories.map(subCategory => ({
                id: subCategory._id,
                name: subCategory.name,
                categoryId: category._id
            })));
        }
        return acc;
    }, []);
}, [categoryWithSubCategory]);


  // Function for add  product
  async function handleSaveProduct(data){
    try{
      let result = await addNewProduct(data)

     if(result.code==200){
        alert("Successfully added")
        handleAddProductPopUpClose()
      }else{
        alert(result.message)
        handleAddProductPopUpClose()
      }
    }catch(error){

    }
  }

  // Function for add category
  async function handleAddCategory(category){
    try{
      let requestBody ={
        categoryName : category
      }
      let result = await addCategory(requestBody)
      if(result.code==200){
        alert("Successfully added")
        handleSubCategoryPopUpClose()
      }else{
        alert(result.message)
        handleSubCategoryPopUpClose()
      }
    }catch(error){

    }
  }

  // Function for add sub category
  async function handleAddSubCategory(categoryId,subCategoryName){
    try{
      console.log("sub category",categoryId,subCategoryName);
      let requestBody ={
        categorId : categoryId,
        subCategoryName : subCategoryName
      }
      let result =  await addSubCategory(requestBody);
      if(result.code==200){

           alert("Successfully added")
        handleCategoryPopUpClose()
      }else{
        alert(result.message)
        handleCategoryPopUpClose()
      }

    }catch(error){

    }
  }

  // Function for get all categories
  async function getAllCategories(){
    try{
      let result = await getCategoryWithSubCategory()

      setCategoryWithSubCategory(result.data)
    }catch(error){

    }
  }

  // Initial time this useEffect will render
  useEffect(()=>{
    getAllCategories();
  },[showSubCategoryPopup])

  async function getAllProductData(){
    try{
      searchFilterValues.page = page
      searchFilterValues.limit = 5
      let result = await getAllProductWithSearch(searchFilterValues)
      if(result.code==200){
        setProducts(result.data);
      }else{
        alert('Product data feched faild')
      }
    }catch(err){

    }

  }

  useEffect(()=>{
    getAllProductData();
  },[searchFilterValues.name,searchFilterValues.subCategory, page])
  let data = {
    "_id": "66991263df2102760a535834",
    "title": "HP AMD Ryzen 3",
    "productCode": "HP-AMD-RYZEN-3-86d67346-1991-4b0e-9fdd-df858e8e404e-1721308494290",
    "variants": [],
    "subCategory": "66990d316e9e0c4d4810c1d9",
    "description": "test",
    "images": [
        {
            "filename": "/products/393066_116-1168017_4k-ultra-hd-wallpaper-3d-4k.jpg",
            "_id": "6699154edad2a091ba2c8cee"
        },
        {
            "filename": "/products/483490_admin home.png",
            "_id": "6699154edad2a091ba2c8cef"
        }
    ],
    "createdAt": "2024-07-18T13:02:27.630Z",
    "__v": 3
}
  return (
    <div className='container-fluid row'>
      <BreadCrumb 
      handleAddProductPopUpShow={handleAddProductPopUpShow} 
      handleCategoryPopUpShow={handleCategoryPopUpShow} 
      handlSubCategoryPopUpShow={handlSubCategoryPopUpShow} 
      buttonShow={true}
      pathName={'Dashboard'}
      setSearchFilterValues = {setSearchFilterValues}
      />
      <div className='col-md-2 col-lg-2'>
        <SideBar categoryWithSubCategory={categoryWithSubCategory} setSearchFilterValues={setSearchFilterValues}/>
      </div>
      <div className='col-md-10 col-lg-10'>
        <AddProductPopup 
          show={showAddProductPopup} 
          handleClose={handleAddProductPopUpClose}
          handleSaveProduct={handleSaveProduct}
          subCategories={subCategories}
        />
        <AddCategoryPopup 
          show={showCategoryPopup} 
          handleClose={handleCategoryPopUpClose} 
          handleAddCategory={handleAddCategory}
        />
        <AddSubCategoryPopup 
          show={showSubCategoryPopup} 
          handleClose={handleSubCategoryPopUpClose} 
          handleAddSubCategory={handleAddSubCategory}
          categoryList={categoryWithSubCategory}
          
        />
        <ListingProbox products={products} />
      </div>
    </div>
  );
}

export default Home;
