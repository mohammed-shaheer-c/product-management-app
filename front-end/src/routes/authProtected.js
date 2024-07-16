////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                            //
//                       Authentication protection functionality done over here.              //
//                                                                                            //
////////////////////////////////////////////////////////////////////////////////////////////////

import React from "react";
import { Navigate } from "react-router-dom";
import { isUserLogin } from "../hooks/useAuth";

const AuthProtected = (props) => {
  const loggedIn = isUserLogin();

  /*
    redirect is un-auth access protected routes via url
  */

  // if (!loggedIn) {
  //   return (
  //     <Navigate to={{ pathname: "/login", state: { from: props.location } }} />
  //   );
  // }

  return <>{props.children}</>;
};

export default AuthProtected;

