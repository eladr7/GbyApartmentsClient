import React from "react"
import Layout from "../components/layout"

export default function Contact() {
  return (
    <Layout headerText="I'd love to talk! Email me at the address below" pageTitle="My site title">
      <p>
        <a href="mailto:me@example.com">me@example.com</a>
      </p>
    </Layout>
  )
}