import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import util from "../../utils/util";
import { useRouter } from "next/router";
import { loginUser } from "../../stores/user";

export const EVENT_QUERY = gql`
  query {
    pcoMe {
      idx
      name
      company
      summary
      active_yn
      created_at
      event {
        idx
        title
        code
      }
    }
  }
`;

const MiceContainer = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;

  const { loading, error, data, refetch } = useQuery(EVENT_QUERY, {});

  //   const [user, setUser] = useState({});
  //   useEffect(() => {}, []);

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    const { pcoMe } = data;

    loginUser(pcoMe);

    if (pathname === "/mice/event/create") {
      if (data?.pcoMe?.event?.idx) {
        location.href = "/mice/home";
      }
    } else {
      if (!data?.pcoMe?.event?.idx) {
        location.href = "/mice/event/create";
      }
    } // 주석
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  if (loading) return <></>;

  return <>{children}</>;
};

export default MiceContainer;
