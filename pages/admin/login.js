import React, { useState } from "react";
import Head from "next/head";
import Login from "../../components/odc/LoginAdmin";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>LOGIN ADMIN</title>
        <link rel="stylesheet" href="/stylesheets/cms_02.css" />
        <link rel="stylesheet" href="/stylesheets/cms.css" />
      </Head>

      <Login />
    </>
  );
};

LoginPage.props = {
  title: "LOGIN",
};
export default LoginPage;
