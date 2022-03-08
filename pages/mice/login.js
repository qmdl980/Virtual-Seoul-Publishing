import React, { useState } from "react";
import Head from "next/head";
import cookieParser from "cookie-parse";
import LoginMice from "../../components/odc/LoginMice";
//import LoginMice from "../../components/login/LoginPco";
const LoginPage = () => {
  return (
    <>
      <Head>
        <title>LOGIN MICE</title>
        <link rel="stylesheet" href="/stylesheets/cms_02.css" />
      </Head>

      <LoginMice />
    </>
  );
};

LoginPage.props = {
  title: "LOGIN",
};

export const getServerSideProps = async (ctx) => {
  const { req } = ctx;
  let props = {};

  if (req?.headers.cookie) {
    const cookies = cookieParser.parse(req.headers.cookie);
    const token = cookies.miceToken;

    if (token) {
      return {
        redirect: {
          destination: "home",
          permanent: false,
        },
      };
    }
  }

  return {
    props,
  };
};
export default LoginPage;
