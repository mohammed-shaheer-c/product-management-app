import React from 'react';
import styles from './Signup.module.css'; // Import the CSS module

function SignupPage() {
  return (
    <div className={styles.containerFluid}>
      <div className={`${styles.box} row`}>
        <div className={`${styles.loginSection} col-6`}>
          <h2>Welcome Back!</h2>
          <p>To keep connected with us please login with your personal info</p>
          <button className={styles.signInButton}>SIGN IN</button>
        </div>
        <div className={`${styles.signupSection} col-6`}>
          <h2 className={`${styles.signuSectionHead} ms-1`}>Create Account</h2>
          <form>
            <div className={styles.inputGroup}>
              <input type="text" placeholder="Name" />
              <span>Enter name</span>
            </div>
        
            <div className={styles.inputGroup}>
              <input type="email" placeholder="Email" />
              <span>Enter name</span>
            </div>
            <div className={styles.inputGroup}>
              <input type="password" placeholder="Password" />
              <span>Enter name</span>
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
