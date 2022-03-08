import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import util from "../../../utils/util";
import { gql, useQuery, useMutation } from "@apollo/client";
import PresentationList from "../../../components/presentation/PresentationList";
import SessionPeopleList from "../../../components/sessionPeople/SessionPeopleList";
import DetailView from "../../../components/common/table/DetailView";
import PeopleList, {
  PEOPLE_QUERY,
  columns,
} from "../../../components/people/PeopleList";

const PeopleDetailPage = ({ idx }) => {
  const { loading, error, data, refetch } = useQuery(PEOPLE_QUERY, {
    variables: { idx: parseInt(idx, 10) },
  });
  const [detail, setDetail] = useState();

  const _read = async (prop) => {
    setDetail(data.people);
  };
  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);
  return (
    <>
      <PcoDocHeader title={"INVITED SPEAKER"} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap detatil__wrap">
            <DetailView
              columns={columns}
              title="Invited Speaker"
              detail={detail}
              pageRouter="/pco"
            />
            <PresentationList
              peopleIdx={idx}
              sessionIdx={0}
              pageRouter="/pco"
            />
            <SessionPeopleList
              peopleIdx={idx}
              sessionIdx={0}
              pageRouter="/pco"
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
export default React.memo(PeopleDetailPage);
