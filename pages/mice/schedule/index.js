import React, { useState, useEffect, useMemo } from "react";;
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import ScheduleList from "../../../components/schedule/ScheduleList";

const ScheduleListPage = (props) => {
  const router = "schedule";
  const title = "SCHEDULE";

  return (
    <>
      <PcoDocHeader title={title} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <ScheduleList eventIdx={0} pageRouter="/pco" />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(ScheduleListPage);
