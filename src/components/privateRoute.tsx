import React, { useContext, useRef } from "react"
import { UserContext } from '../stores/userContext';
import { navigate } from "gatsby"
import { useMeQuery } from "../generated/graphql";
// import { RouteComponentProps } from "react-router";
// import { Router } from "@reach/router"

const PrivateRoute: React.FC<any> = ({ component: Component, location, ...rest }) => {
  const userContext = useRef(useContext(UserContext));
  const { myServerClient } = userContext.current.getMyServerClient();
  const { data, loading } = useMeQuery({ client: myServerClient, fetchPolicy: "network-only" });

  if (loading) return (<p>Verifying user...</p>);

  if (data && data.me) {
    return (<Component {...data} />);
  } else if (location.pathname !== `/app/login`) {
    navigate("/app/login")
    return null;
  }

  return (<div>Some error occured</div>);
}

export default PrivateRoute