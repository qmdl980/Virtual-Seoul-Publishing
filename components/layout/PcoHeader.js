import React, { useEffect, useState } from "react";
import { useReactiveVar } from "@apollo/client";
import util from "../../utils/util";
import { useRouter } from "next/router";
import userVar from "../../stores/user";

const PcoHeader = () => {
  const router = useRouter();
  const pathname = router.pathname;

  const logout = (e) => {
    location.href = "/mice/logout";
  };

  const user = useReactiveVar(userVar);

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (pathname === "/mice/event/create") {
      if (data?.pcoMe?.event?.idx) {
        location.href = "/mice/home";
      }
    } else {
      if (!data?.pcoMe?.event?.idx) {
        location.href = "/mice/event/create";
      }
    }
  };

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <img src="/images/vslogo.png" alt="logo" />
        </div>
        <h1 className="header__title">
          MICE{" "}
          {!user?.event ? "" : user?.event?.title || "Create New Event"}
        </h1>

        <div className="header__userInfo">
          <p
            className="header__userName"
            style={{ cursor: "pointer", marginRight: "5px" }}
            onClick={(e) => {
              location.href = "/pco/myInfo";
            }}
          >
            User name{/*{user?.name}*/}
          </p>
          <div
            className={"triangle_down"}
            style={{ marginRight: "10px" }}
          ></div>
          <button className="header__logout" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default PcoHeader;
