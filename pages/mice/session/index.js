import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import SessionList from "../../../components/session/SessionList";

const SessionListPage = (props) => {
  const router = "session";
  const title = "SESSION";

  return (
    <>
      <PcoDocHeader title={title} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <SessionList scheduleIdx={0} pageRouter="/pco" />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(SessionListPage);
