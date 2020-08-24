import React from "react"
import Layout from '../components/layout'


export default function About() {
  return (
    <Layout headerText="About me" pageTitle="My site title">
      <div className="about">
        <h3>Apartemnts TLV is an apartments compound located in the center of Tel-Aviv <br></br>
        and provides housing both tourists and local residents</h3>

        <h4 className="subtitle">Your'e welcome to take a look at the available apartments. HF ;)</h4>
      </div>
    </Layout>
  )
}