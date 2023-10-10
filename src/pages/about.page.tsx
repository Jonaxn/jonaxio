import React from "react";
import { BlitzPage } from "@blitzjs/next";
import Layout from "@/core/layouts/Layout";

const AboutPage: BlitzPage = () => {
  return (
    <Layout title="about">
      <div>this is about page me</div>
    </Layout>
  );
};

export default AboutPage;
