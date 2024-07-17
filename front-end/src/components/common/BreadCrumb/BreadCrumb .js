import { Link } from "react-router-dom";
import styles from './BreadCrumb.module.css'; // Import the CSS module
import Button from '../Button/Button';


const BreadCrumb = (props) => {

  return (
    <div className={`${styles.breadcrumbContainer} row`}>
      <div className={`${styles.breadcrumb} col-md-3 col-lg-4`}>
        <Link to="/" className={styles.link}>Home</Link> &gt; <span className={styles.active}>{props.pathName ?? ''}</span>
      </div>
      {props.buttonShow && <div className={`${styles.buttons} col-md-9 col-lg-8`}>
        <Button onClick={props.handleCategoryPopUpShow} label="Add Category" />
        <Button onClick={props.handlSubCategoryPopUpShow} label="Add Sub Category" />
        <Button onClick={props.handleAddProductPopUpShow} label="Add Product" />
      </div>}
    </div>
  );
};

export default BreadCrumb;
