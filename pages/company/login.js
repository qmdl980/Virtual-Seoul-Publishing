import React, { useState } from "react";
import Head from "next/head";
import LoginCom from "../../components/login/LoginCom";

const LoginPage = () => {
  return (
    <>
      <Head>
        <title>LOGIN</title>
        <link rel="stylesheet" href="/stylesheets/cms_02.css" />
      </Head>

      <LoginCom />
    </>
  );
};

LoginPage.props = {
  title: "LOGIN",
};
export default LoginPage;
