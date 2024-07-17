import React,{useState} from 'react';
import SideBar from '../../components/SideBar/SideBar';
import ListingProbox from '../../components/ListingProbox/ListingProbox';
import BreadCrumb from '../../components/common/BreadCrumb/BreadCrumb ';
import  AddProductPopup  from '../../components/common/OpenPopUp/AddProductPopup/AddProductPopup'
import AddSubCategoryPopup from '../../components/common/OpenPopUp/AddSubCategoryPopup/AddSubCategoryPopup';
import AddCategoryPopup from '../../components/common/OpenPopUp/AddCategoryPopup/AddCategoryPopup';

function Home() {
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [showCategoryPopup, setShowCategoryPopup] = useState(false);
  const [showSubCategoryPopup, setSubCategoryPopup] = useState(false);

  // Function for add product popup
  const handleAddProductPopUpShow = () => setShowAddProductPopup(true);
  const handleAddProductPopUpClose = () => setShowAddProductPopup(false);

  // Function category popup
  const handleCategoryPopUpShow = () => setShowCategoryPopup(true);
  const handleCategoryPopUpClose = () => setShowCategoryPopup(false);

  // Function sub category popup
  const handlSubCategoryPopUpShow = () => setSubCategoryPopup(true);
  const handleSubCategoryPopUpClose = () => setSubCategoryPopup(false);
  return (
    <div className='container-fluid row'>
      <BreadCrumb 
      handleAddProductPopUpShow={handleAddProductPopUpShow} 
      handleCategoryPopUpShow={handleCategoryPopUpShow} 
      handlSubCategoryPopUpShow={handlSubCategoryPopUpShow} 
      buttonShow={true}
      pathName={'Dashboard'}
      />
      <div className='col-md-2 col-lg-2'>
        <SideBar />
      </div>
      <div className='col-md-10 col-lg-10'>
        <AddProductPopup show={showAddProductPopup} handleClose={handleAddProductPopUpClose} />
        <AddCategoryPopup show={showCategoryPopup} handleClose={handleCategoryPopUpClose} />
        <AddSubCategoryPopup show={showSubCategoryPopup} handleClose={handleSubCategoryPopUpClose} />
        <ListingProbox />
      </div>
    </div>
  );
}

export default Home;
