import React, { useContext, useRef } from "react"
import { useQuery } from '@apollo/react-hooks';

import Layout from '../components/layout'

import { PaginationContext } from '../stores/paginationContext';
import WpApartmentsLinks from '../components/wpApartmentsLinks'

export default function Home() {
  const paginationContext = useRef(useContext(PaginationContext));
  const { wpQuery, variables, wpClient } = paginationContext.current.getPaginationQuery();

  const { loading, error, data } = useQuery(wpQuery, { client: wpClient, variables: { ...variables } });

  if (loading) return <p>Loading the apartments previews</p>;

  if (error) return (
    <Layout pageTitle="My site title" headerText="Apartments list" pagination={true}>
      <p>Error :(</p>
    </Layout>
  )

  if (data.posts) {
    return (
      <Layout pageTitle="My site title" headerText="Apartments list" pagination={true}>
        <WpApartmentsLinks previews={data.posts} />
      </Layout>
    );
  }

  return (
    <Layout pageTitle="My site title" headerText="Apartments list" pagination={true}>
      <div>No apartments to show</div>
    </Layout>
  );
}
