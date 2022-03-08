import React from "react";
import Head from "next/head";

const PcoDocHeader = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="/stylesheets/cms_02.css" />
    </Head>
  );
};

export default PcoDocHeader;
