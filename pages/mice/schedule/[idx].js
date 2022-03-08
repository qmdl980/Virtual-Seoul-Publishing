import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import util from "../../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import SessionList from "../../../components/session/SessionList";
import DetailView from "../../../components/common/table/DetailView";
import ScheduleList, {
  SCHEDULE_QUERY,
  columns,
} from "../../../components/schedule/ScheduleList";

const ScheduleDetailPage = ({ idx }) => {
  const { loading, error, data, refetch } = useQuery(SCHEDULE_QUERY, {
    variables: { idx: parseInt(idx, 10) },
  });
  const [detail, setDetail] = useState();

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    console.log("read call.", data);
    setDetail(data.schedule);
  };
  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);
  return (
    <>
      <PcoDocHeader title={"Schedule"} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap detatil__wrap">
            <DetailView
              columns={columns}
              title="Schedule"
              detail={detail}
              pageRouter="/pco"
              // detailData={detailData}
            />
            <SessionList scheduleIdx={idx} pageRouter="/pco" />
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
export default React.memo(ScheduleDetailPage);
