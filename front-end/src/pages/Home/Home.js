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
  const [productAdded, setProductAdded] = useState(false);
  const [products, setProducts]  = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);
// Total number of items product
  const [totalProduct, setTotalProduct] = useState(0)
  const totalPages = Math.ceil(totalProduct / rowsPerPage);

  // Function for add product popup
  const handleAddProductPopUpShow = () => {setShowAddProductPopup(true)
  setProductAdded(false)}
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
        setProductAdded(true)
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
      searchFilterValues.page = currentPage
      searchFilterValues.limit = rowsPerPage
      let result = await getAllProductWithSearch(searchFilterValues)
      if(result.code==200){
        setProducts(result.data);
        setTotalProduct(result.count)
      }else{
        alert('Product data feched faild')
      }
    }catch(err){

    }

  }

  useEffect(()=>{
    getAllProductData();
  },[searchFilterValues.name,searchFilterValues.subCategory, currentPage,productAdded])

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
        <ListingProbox 
        products={products}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={setRowsPerPage}
        totalItems={totalProduct}
         />
      </div>
    </div>
  );
}

export default Home;
