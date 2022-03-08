import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import util from "../../utils/util";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      util.deleteCookie("miceToken");
      location.href = "/mice";
    };
    logout();
  }, []);
  return <></>;
};

export default Logout;
