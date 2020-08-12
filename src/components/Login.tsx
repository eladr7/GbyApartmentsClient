import React, { useContext, useState } from "react"
// import { UserContext } from '../services/userContext';

// import { useQuery, useMutation } from '@apollo/react-hooks';
// import { getUserQuery, addUserMutation } from './books/queries/queries';

import { navigate } from "gatsby"

// import { RouteComponentProps } from "react-router";
import { useSignUpMutation, MeDocument, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";


import GoogleLogin from 'react-google-login';
const googleAppId = "916430282052-fgf6b716m19seu57dhr9dtj99o7tcevs.apps.googleusercontent.com"


const signupToServer = async (signup, tokenId) => {
  const response = await signup({
    variables: { token: tokenId },
    // update: (store, { data }) => {
    //   if (!data) {
    //     return null;
    //   }

    //   store.writeQuery<MeQuery>({
    //     query: MeDocument,
    //     data: {
    //       me: data.login.user
    //     }
    //   });
    // }
  });

  if (response && response.data) {
    setAccessToken(response.data.signUp.accessToken);
  }

  // history.push("/");
  // navigate(`/app/profile`)
  navigate(`/`)
}

interface Props { }


const Login: React.FC<Props> = () => {
  const [signup] = useSignUpMutation();

  const onSuccessLogin = () => res => {
    debugger
    const { tokenId, profileObj: { name, email } } = res;
    // const user = { name, email, token: tokenId };
    // userContext.setSuccessfulLogin(user);

    signupToServer(signup, tokenId);
  }

  return (
    <div>
      <GoogleLogin
        className="loginbtn"
        clientId={googleAppId}
        buttonText="Login"
        onSuccess={onSuccessLogin()}
        onFailure={e => { console.error(e); }}
      >
        Continue with Google
      </GoogleLogin>
    </div>
  );
}

export default Login;