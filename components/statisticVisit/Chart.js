import React, { useState, useEffect, useMemo } from "react";
import { Line } from "react-chartjs-2";
import { gql, useQuery, useMutation } from "@apollo/client";
import util from "../../utils/util";

export const STATISTIC_VISIT_QUERY = gql`
  query {
    statisticVisit {
      event_idx
      event_title
      kst
      visit_count
    }
  }
`;

const borderColor = [
  "rgb(255,39,69)",
  "rgb(12,68,255)",
  "rgb(236,85,133)",
  "rgb(52,148,210)",
  "rgb(0,0,0)",
];

const Chart = (props) => {
  const { loading, error, data, refetch } = useQuery(STATISTIC_VISIT_QUERY, {
    variables: {},
  });

  const [barData, setBarData] = useState({
    labels: [],
    datasets: [],
  });

  const _dataSet = (data) => {
    let labels = [];
    let datasets = [];

    const labelsArr = [];
    const titleArr = [];

    // label 데이터 추가

    data.statisticVisit.map((arr, index) => {
      labelsArr.push(arr.kst);
      titleArr.push(arr.event_title);
    });

    labelsArr.sort();

    labels = labelsArr.filter((element, index) => {
      return labelsArr.indexOf(element) === index;
    });

    // data 데이터 추가
    const uniqueEvent = titleArr.filter((element, index) => {
      return titleArr.indexOf(element) === index;
    });

    uniqueEvent.map((title, index) => {
      datasets.push({
        label: title,
        data: [],
        fill: false,
        borderColor: borderColor[index],
        tension: 0.1,
      });
    });

    labels.map((date) => {
      const filterData = data.statisticVisit.filter(
        (element) => element.kst === date
      );

      uniqueEvent.map((eventTitle) => {
        const isData = filterData.find(
          (filData) => filData.event_title === eventTitle
        );
        const arrIdx = datasets.findIndex((i) => i.label === eventTitle);

        if (isData) {
          datasets[arrIdx].data.push(isData.visit_count);
        } else {
          datasets[arrIdx].data.push(0);
        }
      });
    });

    setBarData({
      labels: labels,
      datasets: datasets,
    });
  };

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    if (data && data.statisticVisit) {
      _dataSet(data);
    }
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  if (loading) return <div>Loading..</div>;

  return (
    <Line
      data={barData}
      width={200}
      height={300}
      options={{
        maintainAspectRatio: false,
      }}
    />
  );
};

export default Chart;
