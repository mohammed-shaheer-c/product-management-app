import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css'; // Ensure this path matches your actual CSS module file
import { login } from "../../../services/authService";
export default function LoginPage() {
  const navigate = useNavigate();
  console.log("url",process.env.REACT_APP_API_BASE_URL);
  // States
  const [formFields, setFormFields] = useState({
    txtEmail: '',
    txtPassWord: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    apiErrorMsg : '',
    txtEmailErrorMsg : '',
    txtPasswordErrorMsg : ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if( formFields.txtEmail == '' || formFields.txtPassWord == ''){

          setErrorMessage((prev)=>({...prev,apiErrorMsg : ''}));
 
          if(formFields.txtEmail == ''){
            setErrorMessage((prev)=>({...prev, txtEmailErrorMsg: 'Enter email.'}));
          }else{
            // Clear previous error messages
            setErrorMessage((prev)=>({...prev, txtEmailErrorMsg: ''}));
          }
          if(formFields.txtPassWord == ''){
            setErrorMessage((prev)=>({...prev, txtPasswordErrorMsg: 'Enter password.'}));
          }else{
            // Clear previous error messages
            setErrorMessage((prev)=>({...prev, txtPasswordErrorMsg: ''}));
          }
          return; 
      }
      // Clear previus state
      setErrorMessage((prev) => ({
        ...prev,
        txtEmailErrorMsg: '',
        txtPasswordErrorMsg: '',
      }));
      // Signin functionality 

      const  result = await login(formFields);
      if(result.code == 200){
         localStorage.setItem('authUser', true);
         navigate('/home');
      }else{
        setErrorMessage((prev)=>({...prev, apiErrorMsg: result.message}));
      }


    } catch (error) {
      // Handle error
      console.error("Login failed:", error);
    }
  };
  
  // Function for form submit
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className={styles.containerFluid}>
      <div className={`${styles.box} row`}>
        <div className={`${styles.loginSection} col-8`}>
          <h2 className={`${styles.signupSectionHead} ms-5`}>Sign In to Your Account</h2>
          {errorMessage.apiErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.apiErrorMsg}</span>}
          <form onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="txtEmail"
                placeholder="Email"
                onChange={handleChange}
              /> 
              {errorMessage.txtEmailErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtEmailErrorMsg}</span>}
            </div>
            <div className={styles.inputGroup}>
            <input
                type="password"
                name="txtPassWord"
                placeholder="Password"
                onChange={handleChange}
              />
              {errorMessage.txtPasswordErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtPasswordErrorMsg}</span>}
            </div>
            <div className='w-100 d-flex justify-content-cent'>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
            </div>
         
            <div className='w-100 d-flex justify-content-cent'>
              <button type="submit" className={`${styles.signInButton} me-3`}>SIGN IN</button>
            </div>
          </form>
        </div>
        <div className={`${styles.signupSection} col-4`}>
          <h2>Hello Friend!</h2>
          <p>Enter your personal details and start your journey with us</p>
          <Link to='/register'><button className={styles.signUpButton}>SIGN UP</button></Link>
        </div>
      </div>
    </div>
  );
}
