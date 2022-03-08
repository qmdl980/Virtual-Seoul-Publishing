import React, { useState, useEffect, useMemo } from "react";
import AdminDocHeader from "../../../components/layout/AdminDocHeader";
import AdminHeader from "../../../components/layout/AdminHeader";
import AdminNavbar from "../../../components/layout/AdminNavbar";
import util from "../../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import DetailView from "../../../components/common/table/DetailView";
import PcoList, { PCO_QUERY, columns } from "../../../components/pco/PcoList";
import PcoUserList from "../../../components/pcoUser/PcoUserList";
import EventList from "../../../components/event/EventList";

const PcoDetailPage = ({ idx }) => {
  const { loading, error, data, refetch } = useQuery(PCO_QUERY, {
    variables: { idx: parseInt(idx, 10) },
  });
  const [detail, setDetail] = useState();

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    // console.log("read call.", data);
    setDetail(data.pco);
  };
  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);
  return (
    <>
      <AdminDocHeader title={"PCO User"} />
      <div className="wrap">
        <AdminHeader />
        <AdminNavbar />
        <div className="contents">
          <div className="contents__wrap detatil__wrap">
            <DetailView
              columns={columns}
              title="PCO"
              detail={detail}
              pageRouter="/admin"
              // detailData={detailData}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const idx = query.idx;
  // console.log("server idx ::", idx);
  return { props: { idx } };
};

// export default PcoDetail;
export default React.memo(PcoDetailPage);
