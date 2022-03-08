import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import MyInfoPco from "../../../components/myInfo/MyInfoPco";

const UserListPage = (props) => {
  const router = "user";
  const title = "USER";

  return (
    <>
      <PcoDocHeader title={title} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <MyInfoPco />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(UserListPage);
