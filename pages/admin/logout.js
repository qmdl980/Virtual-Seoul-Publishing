import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const Logout = () => {
  useEffect(() => {
    const logout = async () => {
      sessionStorage.removeItem('adminToken');
      location.href = '/admin';      
    }
    logout();
  }, []);
  return (
    <>
    </>
  );
};

export default Logout;
