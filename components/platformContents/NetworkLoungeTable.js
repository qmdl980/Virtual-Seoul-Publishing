import React from "react";

const NetworkLoungeTable = ({ inputs, _onChange, _contentSave }) => {
  const { name, zoom_number, zoom_password, survey_url } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "20%" }}>
              항목
            </th>
            <th className="virtual-table-th">입력</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">그룹채팅(ZOOM)</td>
            <td>
              <>
                <input
                  type={"text"}
                  style={{
                    fontSize: "1.6rem",
                    width: "45%",
                    padding: "5px 10px",
                    borderRight: "3px solid #e1e0ff",
                  }}
                  placeholder="Room number"
                  name="zoom_number"
                  value={zoom_number || ""}
                  onChange={_onChange}
                ></input>
                <input
                  type={"text"}
                  style={{
                    fontSize: "1.6rem",
                    width: "45%",
                    padding: "5px 10px",
                  }}
                  placeholder="Room password"
                  name="zoom_password"
                  value={zoom_password || ""}
                  onChange={_onChange}
                ></input>
                <button
                  className="input-file-button"
                  name="zoom_test"
                  onChange={_onChange}
                >
                  테스트
                </button>
              </>
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">설문조사</td>
            <td>
              <input
                type="url"
                name="survey_url"
                value={survey_url || ""}
                onChange={_onChange}
                style={{
                  width: "90%",
                  padding: "5px 10px",
                  fontSize: "1.6rem",
                }}
                placeholder="설문 링크 URL 입력 (google, naver 등)"
              />
              <button className="input-file-button" name="survey_test">
                테스트
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: "#252525" }}>
        {" "}
        콘텐츠 미삽입 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로 출력됩니다.
      </p>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default NetworkLoungeTable;
