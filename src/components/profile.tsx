import React, { useContext, useRef } from "react"
import { UserContext } from '../stores/userContext';

import { useLogoutMutation, MeQuery } from "../generated/graphql";
import { setAccessToken } from "../accessToken";

import { navigate } from "gatsby"


const Profile: React.FC<MeQuery> = (data) => {
  const userContext = useRef(useContext(UserContext));
  const { myServerClient } = userContext.current.getMyServerClient();
  const [logout, { client }] = useLogoutMutation({ client: myServerClient});

  if (!data || !data.me || !data.me.email) return (<div>No user data</div>);

  return (
    <>
      <h1>Your profile</h1>
      <ul>
        <li>Name: {data.me.name}</li>
        <li>E-mail: {data.me.email}</li>
      </ul>
      <button
        onClick={async () => {
          await logout();
          setAccessToken("");
          await client!.resetStore();
          navigate(`/app/login`);
        }}
      >
        logout
      </button>
    </>
  );
}

export default Profile