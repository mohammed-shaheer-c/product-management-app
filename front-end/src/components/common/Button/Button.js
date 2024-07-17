import React from 'react';
import styles from './Button.module.css';

const Button = ({ label, onClick }) => {
  return (
    <button  type="button" onClick={onClick} className={styles.btn}>
      {label}
    </button>
  );
}
// Default props
Button.defaultProps = {
  width: "auto",
  icon: "",
  name: "",
  value: "Submit",
  disabled: false,
  className: "btntype2",
  onClick: function () {},
};

export default Button;
