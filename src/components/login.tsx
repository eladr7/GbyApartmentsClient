import React, { useContext, useState, useRef } from "react"
import { UserContext } from '../stores/userContext';

import { navigate } from "gatsby"

import { useSignupMutation, useMeQuery, MeDocument } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

import GoogleLogin from 'react-google-login';
const googleAppId = "916430282052-fgf6b716m19seu57dhr9dtj99o7tcevs.apps.googleusercontent.com"


const signupUser = async (token, signup, myServerClient) => {
  const response = await signup({
    client: myServerClient,
    variables: { token: token },
    update: (store, { data }) => {
      if (!data) {
        return null;
      }
      // store.writeQuery<MeQuery>({
      store.writeQuery({
        query: MeDocument,
        data: {
          me: data.signup.user
        }
      });
    }
  });

  if (response && response.data) {
    setAccessToken(response.data.signup);
    navigate(`/app/profile`)
  }
}

// https://youtu.be/N2q-ZYuQWI8?t=66
const Login: React.FC<any> = () => {
  const userContext = useRef(useContext(UserContext));
  const { myServerClient } = userContext.current.getMyServerClient();

  const [addedCount, setAddedCount] = useState(0);
  const [token, setToken] = useState("");

  const [signup] = useSignupMutation();

  const { data, loading, error } = useMeQuery({ client: myServerClient, fetchPolicy: "network-only" });

  const onSuccessLogin = () => res => {
    const { tokenId } = res;
    setToken(tokenId);
  }

  if (data && data.me && data.me.id) {
    navigate(`/app/profile`)
  }
  else {
    if (addedCount === 0) {
      if (!loading && error && error.message.includes("not authenticated") && token !== "") {
        setAddedCount(addedCount + 1);
        signupUser(token, signup, myServerClient);
      }
    }
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