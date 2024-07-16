import React from 'react';
import styles from './Login.module.css'; // Ensure this path matches your actual CSS module file

export default function LoginPage() {
  return (
    <div className={styles.containerFluid}>
      <div className={`${styles.box} row`}>
        <div className={`${styles.loginSection} col-8`}>
          <h2 className={`${styles.signupSectionHead} ms-5`}>Sign In to Your Account</h2>
          <form>
            <div className={styles.inputGroup}>
              <input
               type="email" 
               placeholder="Email"
               />
              <span>Enter name</span>
            </div>
            <div className={styles.inputGroup}>
              <input type="password" placeholder="Password" />
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
          <button className={styles.signUpButton}>SIGN UP</button>
        </div>
      </div>
    </div>
  );
}
