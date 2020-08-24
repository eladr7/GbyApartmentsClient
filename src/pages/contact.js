import React from "react"
import Layout from "../components/layout"

export default function Contact() {
  return (
    <Layout headerText="I'd love to talk! Email me at the address below" pageTitle="My site title">
      <div className="contact">
        <h4>Email: example@example.com</h4>
        <h4>Phone number: +972-50-777-7777</h4>
        <h4>
          <a href="mailto:me@example.com">Or click here to open your email program</a>
        </h4>
      </div>
    </Layout>
  )
}