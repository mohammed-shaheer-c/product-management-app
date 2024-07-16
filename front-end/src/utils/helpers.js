const getLoggedinUser = () => {
    const user = localStorage.getItem("authUser");
    if (!user) {
      return null;
    } else {
      return JSON.parse(user);
    }
  };

  
  export { getLoggedinUser };