import React, { useState, useEffect, useMemo } from "react";
import AdminDocHeader from "../../../components/layout/AdminDocHeader";
import AdminHeader from "../../../components/layout/AdminHeader";
import AdminNavbar from "../../../components/layout/AdminNavbar";
import MyInfoAdmin from "../../../components/myInfo/MyInfoAdmin";

const UserListPage = (props) => {
  const router = "user";
  const title = "USER";

  return (
    <>
      <AdminDocHeader title={"My Info"} />
      <div className="wrap">
        <AdminHeader />
        <AdminNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <MyInfoAdmin />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(UserListPage);
