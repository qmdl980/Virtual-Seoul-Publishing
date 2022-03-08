import React from "react";
import Head from "next/head";

const AdminDocHeader = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <link rel="stylesheet" href="/stylesheets/cms_02.css" />
      <link rel="stylesheet" href="/stylesheets/cms.css" />
    </Head>
  );
};

export default AdminDocHeader;
