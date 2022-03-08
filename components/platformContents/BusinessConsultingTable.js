import React from "react";

const BusinessConsultingTable = ({
  inputs,
  _onChange,
  _contentSave,
  _changeImg,
}) => {
  const { screen_cover, screen_video, left_banner, right_banner } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "15vw" }}>
              항목
            </th>
            <th className="virtual-table-th">입력</th>
            <th className="virtual-table-th" style={{ width: "15vw" }}>
              항목
            </th>
            <th className="virtual-table-th">이미지 파일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">스크린 영상 커버</td>
            <td className="virtual-table-checkbox">
              {screen_cover ? (
                <button
                  className="input-file-button"
                  name="screen_cover"
                  onClick={_changeImg}
                >
                  변경
                </button>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="screen_cover"
                    htmlFor="screen_cover"
                  >
                    업로드
                  </label>
                  <input
                    name="screen_cover"
                    type="file"
                    id="screen_cover"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">홍보 배너 좌측</td>
            <td className="virtual-table-checkbox">
              {left_banner ? (
                <button
                  className="input-file-button"
                  name="left_banner"
                  onClick={_changeImg}
                >
                  변경
                </button>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="left_banner"
                    htmlFor="left_banner"
                  >
                    업로드
                  </label>
                  <input
                    name="left_banner"
                    type="file"
                    id="left_banner"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>

          <tr className="virtual-table-tr">
            <td className="virtual-table-name">스크린 영상 주소</td>
            <td className="virtual-table-checkbox">
              <input
                type="text"
                name="screen_video"
                style={{ width: "100%" }}
                placeholder={"enter streaming address"}
                value={screen_video || ""}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">홍보 배너 우측</td>
            <td className="virtual-table-checkbox">
              {right_banner ? (
                <button
                  className="input-file-button"
                  name="right_banner"
                  onClick={_changeImg}
                >
                  변경
                </button>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="right_banner"
                    htmlFor="right_banner"
                  >
                    업로드
                  </label>
                  <input
                    name="right_banner"
                    type="file"
                    id="right_banner"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <p style={{ color: "#252525" }}>
        {" "}
        콘텐츠 미삽입 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로 출렵됩니다.
      </p>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default BusinessConsultingTable;
