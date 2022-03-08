import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
// import { withNextSession, applyNextSession } from "../../middleware/session-nextjs";

const IndexPage = ({ isLogin }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // 이미 로그인 되어 있으면 main 으로 이동
    // 아니면 로그인으로 이동.
    console.log("index call.");
    const adminToken = sessionStorage.getItem("adminToken");
    if (!adminToken) {
      location.href = "/admin/login";
    } else {
      location.href = "/admin/home";
    }
  }, []);

  return (
    <>

      <div>{message}</div>
    </>
  );
};

export default IndexPage;
