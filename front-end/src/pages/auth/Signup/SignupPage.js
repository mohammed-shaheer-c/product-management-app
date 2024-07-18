import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import styles from './Signup.module.css'; // Import the CSS module
import { signup } from "../../../services/authService";

function SignupPage() {
  const navigate = useNavigate();
  // States
  const [formFields, setFormFields] = useState({
    txtName : '',
    txtEmail: '',
    txtPassWord: '',
  });
  const [errorMessage, setErrorMessage] = useState({
    apiErrorMsg : '',
    txtNameErroMsg : '',
    txtEmailErrorMsg : '',
    txtPasswordErrorMsg : ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if(formFields.txtName == '' || formFields.txtEmail == '' || formFields.txtPassWord == ''){

            setErrorMessage((prev)=>({...prev,apiErrorMsg : ''}));
          if(formFields.txtName == ''){
            setErrorMessage((prev)=>({...prev, txtNameErroMsg: 'Enter name.'}));
          }else{
            // Clear previous error messages
            setErrorMessage((prev)=>({...prev, txtNameErroMsg: ''}));
          }
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
        txtNameErroMsg :'',
        txtEmailErrorMsg: '',
        txtPasswordErrorMsg: '',
      }));
      // Sign up functionality 
      const  result = await signup(formFields);
      
      if(result.code == 200){
         localStorage.setItem('authUser', true);
         navigate('/home');
      }else{

        setErrorMessage((prev)=>({...prev, apiErrorMsg: result.message}));
      }

    } catch (error) {
      // Handle error
      console.error("Signup failed:", error);
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
        <div className={`${styles.loginSection} col-6`}>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <Link to='/login'><button className={styles.signInButton}>SIGN IN</button></Link>
        </div>
        <div className={`${styles.signupSection} col-6`}>
          <h2 className={`${styles.signuSectionHead} ms-1`}>Create Account</h2>
          {errorMessage.apiErrorMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.apiErrorMsg}</span>}
          <form  onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                name="txtName"
                placeholder="Name"
                onChange={handleChange}
              /> 
              {errorMessage.txtNameErroMsg !=='' &&<span style={{color : 'red'}}>{errorMessage.txtNameErroMsg}</span>}
            </div>
        
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
            <div className='w-100  d-flex justify-content-center'>
              <button type="submit" className={`${styles.signUpButton} `}>SIGN UP</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
