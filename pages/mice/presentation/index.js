import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import PresentationList from "../../../components/presentation/PresentationList";

const PresentationListPage = (props) => {
  const router = "presentation";
  const title = "PRESENTATION";

  return (
    <>
      <PcoDocHeader title={title} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <PresentationList peopleIdx={0} sessionIdx={0} pageRouter="/pco" />
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(PresentationListPage);
