import Head from "next/head";
import React, { FC, Suspense } from "react";
import { BlitzLayout } from "@blitzjs/next";

type Prop = { title?: string; children?: React.ReactNode; maxWidth?: number };
const Layout: BlitzLayout<Prop> = ({ title, maxWidth = 800, children }) => {
  return (
    <>
      <Head>
        <title>{title || "jonaxio"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div
        style={{
          width: "100%",
          maxWidth: maxWidth,
        }}
      >
        {children}
      </div>
    </>
  );
};

export default Layout;
