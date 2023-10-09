import React from "react";
import { userStringParam } from "../utils/utils";

const BlogPostPage = () => {
  const slug = userStringParam("slug");
  return <div>welcome to our BlogPostPage {slug}</div>;
};

export default BlogPostPage;
