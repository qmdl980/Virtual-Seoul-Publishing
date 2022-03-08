import React, { useEffect, useState } from "react";

const Index = ({ isLogin }) => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // 이미 로그인 되어 있으면 main 으로 이동
    // 아니면 로그인으로 이동.
    console.log("index call.");
    const pcoToken = sessionStorage.getItem("miceToken");
    if (!pcoToken) {
      location.href = "/mice/login";
    } else {
      location.href = "/mice/home";
    }
  }, []);

  return (
    <>
      <div>mice 페이지</div>
    </>
  );
};

export default Index;
