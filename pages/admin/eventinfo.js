// import VirtualVenue from "../../components/odc/VirtualVenue";
// import EventInfo from "../../components/odc/EventInfo";
// import AdminDocHeader from "../../components/layout/AdminDocHeader";
// import AdminHeader from "../../components/layout/AdminHeader";
// import AdminNavbar from "../../components/layout/AdminNavbar";
// import EventCreate from "../../components/odc/EventCreate";
import styled from "styled-components";
import React from "react";

const eventinfo = () => {
  return (
    <>
      {/* <AdminDocHeader title={"HOME"} />
            <div className="wrap">
                <AdminHeader />
                <AdminNavbar />
                <div className="contents">
                    <div className="contents__wrap">
                        <EventContainer>
                            <EventInfo></EventInfo>
                            <VirtualVenue></VirtualVenue>
                        </EventContainer>
                    </div>
                </div>

            </div> */}
    </>
  );
};
export default eventinfo;

const EventContainer = styled.div`
  flex: none;
  padding: 50px 100px;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera*/
  }
`;
