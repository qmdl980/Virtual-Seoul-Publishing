import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../components/layout/PcoDocHeader";
import ComHeader from "../../components/layout/ComHeader";
import PcoNavbar from "../../components/layout/PcoNavbar";
import Chart from "../../components/statisticVisit/Chart";

const Home = (props) => {
  const [user, setUser] = useState();
  useEffect(() => {
    const t = JSON.parse(sessionStorage.getItem("companyUser"));
    console.log("t ::", t);
    setUser(t);
  }, []);

  if (!user) return null; // 첫 로딩 시 user 없는 상태로 한번 호출하고 user state 변경 시 다시 한번 호출됨.

  return (
    <>
      <PcoDocHeader title={"HOME"} />
      <div className="wrap">
        <ComHeader user={user} />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <ul>
              <li>{/* <Chart /> */}</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
