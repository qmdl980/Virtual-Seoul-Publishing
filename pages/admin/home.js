import React, { useState, useEffect, useMemo } from "react";
import AdminDocHeader from "../../components/layout/AdminDocHeader";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminNavbar from "../../components/layout/AdminNavbar";
import util from "../../utils/util";
import { Bar, Radar, Doughnut } from "react-chartjs-2";

const radarData = {
  labels: [
    "Eating",
    "Drinking",
    "Sleeping",
    "Designing",
    "Coding",
    "Cycling",
    "Running",
  ],
  datasets: [
    {
      label: "My First dataset",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: "My Second dataset",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const doughnutData = {
  labels: ["매우 만족", "만족", "보통"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
    },
  ],
};

const barData = {
  labels: [
    "2020-03-01",
    "2020-03-02",
    "2020-03-03",
    "2020-03-04",
    "2020-03-05",
    "2020-03-06",
  ],
  datasets: [
    {
      label: "일자별 방문자",
      backgroundColor: "rgba(3, 182, 252,0.2)",
      borderColor: "rgba(3, 182, 252,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const Home = ({ isLogin, navbar }) => {
  useEffect(() => {}, []);

  // if (!rows) return <></>;
  return (
    <>
      <AdminDocHeader title={"HOME"} />
      <div className="wrap">
        <AdminHeader />
        <AdminNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <ul>
              <li>
                <Bar
                  data={barData}
                  width={200}
                  height={300}
                  options={{
                    maintainAspectRatio: false,
                  }}
                />
              </li>
              <li>
                <Doughnut data={doughnutData} />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

// export const getServerSideProps = async ({ req, res }) => {
//   // 공통 코드 / 모든 페이지에 적용 / 세션 체크.
//   await applyNextSession(req, res);
//   const sessionEmail = req.session.get("email");
//   // console.log("nextjs req.session.email ::", req.session.get("email"));

//   if (!sessionEmail) {
//     return {
//       redirect: {
//         destination: "/admin/login",
//         permanent: false,
//       },
//     };
//   }

//   return { props: { isLogin: true } };
// };

export default Home;
