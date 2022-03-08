import React, { useState, useEffect, useMemo } from "react";
import { useReactiveVar } from "@apollo/client";
import PcoDocHeader from "../../components/layout/PcoDocHeader";
import PcoHeader from "../../components/layout/PcoHeader";
import PcoNavbar from "../../components/layout/PcoNavbar";
import MiceContainer from "../../components/layout/MiceContainer";
import Chart from "../../components/statisticVisit/Chart";
import userVar from "../../stores/user";
import cookieParser from "cookie-parse";
import util from "../../utils/util";

const Home = (props) => {
  const user = useReactiveVar(userVar);

  useEffect(() => {}, []);

  if (!user) return null; // 첫 로딩 시 user 없는 상태로 한번 호출하고 user state 변경 시 다시 한번 호출됨.

  return (
    <MiceContainer>
      <PcoDocHeader title={"HOME"} />
      <div className="wrap">
        <PcoHeader user={user} />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <ul>
              <li>home page{/* <Chart /> */}</li>
            </ul>
          </div>
        </div>
      </div>
    </MiceContainer>
  );
};

export default Home;

export const getServerSideProps = async (ctx) => {
  const { req, res, query } = ctx;
  let props = {};

  if (req?.headers?.cookie) {
    const cookies = cookieParser.parse(req.headers.cookie);

    if (!cookies?.miceToken) {
      return {
        redirect: {
          destination: "/mice",
          permanent: false,
        },
      };
    }
  }

  return { props };
};
