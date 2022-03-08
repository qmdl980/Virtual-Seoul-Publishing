import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import util from "../../../utils/util";
import SessionPeopleList from "../../../components/sessionPeople/SessionPeopleList";

const SessionPeopleListPage = (props) => {
  const router = "sessionPeople";
  const title = "SPEAKER ROLE";

  return (
    <>
      <PcoDocHeader title={title} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <SessionPeopleList peopleIdx={0} sessionIdx={0} pageRouter="/pco" />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(SessionPeopleListPage);
