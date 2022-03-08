import React from "react";
import AdminDocHeader from "../../../components/layout/AdminDocHeader";
import AdminHeader from "../../../components/layout/AdminHeader";
import AdminNavbar from "../../../components/layout/AdminNavbar";
import PcoList from "../../../components/pco/PcoList";

const PcoListPage = () => {
  return (
    <>
      <AdminDocHeader title={"PCO User"} />
      <div className="wrap">
        <AdminHeader />
        <AdminNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <PcoList pcoIdx={0} pageRouter="/admin" />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PcoListPage);
