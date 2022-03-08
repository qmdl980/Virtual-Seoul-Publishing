import React, { useState } from "react";
import util from "../../utils/util";
import styled from "styled-components";
import xlsx from "xlsx";

const Excel = () => {
  const [excelData, setExcelData] = useState([]);
  const [file, setFile] = useState("");

  const overlapCheck = (data) => {
    const dataArr = data;

    const overlapData = dataArr.filter(
      (arr, index, callback) =>
        index !== callback.findIndex((t) => t.email === arr.email)
    );

    console.log("overlapData ::", overlapData);

    overlapData.map(({ email }) => {
      dataArr.map((user, index) => {
        if (user.email === email) user.result = "이메일 중복";
      });
    });

    console.log("dataArr ::", dataArr);

    setExcelData(dataArr);
  };

  const readExcel = (e) => {
    let reader = new FileReader();

    reader.onload = function () {
      let data = reader.result;
      let workBook = xlsx.read(data, { type: "binary" });
      workBook.SheetNames.forEach(function (sheetName) {
        console.log("SheetName: " + sheetName);
        let rows = xlsx.utils.sheet_to_json(workBook.Sheets[sheetName]);
        overlapCheck(JSON.parse(JSON.stringify(rows)));
      });
    };
    reader.readAsBinaryString(e);
  };

  return (
    <div>
      <div className="inputContiner">
        <div></div>
        <label>EXCEL FILE</label>
        <input
          type={"file"}
          onChange={(e) => {
            console.log("target value ::", e.target.files[0]);
            setFile({
              ...file,
              [e.target.name]: e.target.files[0],
            });
            readExcel(e.target.files[0]);
          }}
        />
      </div>
      {excelData.length > 0 && (
        <div
          style={{
            height: "500px",
            position: "static",
            overflowY: "scroll",
            width: "700px",
          }}
        >
          <table>
            <tr>
              <th>index / </th>
              <th> name / </th>
              <th> email / </th>
              <th> job_title / </th>
              <th> organization / </th>
              <th> country / </th>
              <th> result</th>
            </tr>
            <tbody>
              {excelData?.map((data, index) => (
                <tr
                  style={{
                    backgroundColor: `${data?.result && "rgb(255,0,0)"}`,
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{data?.name}</td>
                  <td>{data?.email}</td>
                  <td>{data?.job_title}</td>
                  <td>{data?.organization}</td>
                  <td>{data?.country}</td>
                  <td>{data?.result}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Excel;
