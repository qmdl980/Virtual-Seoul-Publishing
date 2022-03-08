import React from "react";

const ETCTable = ({ inputs, _onChange, _contentSave, _changeImg }) => {
  const {
    event_logo,
    guide_yn,
    guide_url,
    channeltalk_yn,
    channeltalk_key,
    playground_yn,
    stamp_yn,
  } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "5vw" }}>
              선택
            </th>
            <th className="virtual-table-th" style={{ width: "20%" }}>
              항목
            </th>
            <th className="virtual-table-th"></th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox"></td>
            <td className="virtual-table-name">메뉴상단로고</td>
            <td>
              <text className="upload_text">
                png, 280x143px, maxium file size 10KB
              </text>
              {event_logo ? (
                <>
                  <button
                    className="input-file-button-right"
                    name="event_logo"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button-right"
                    name="event_logo"
                    htmlFor="event_logo"
                  >
                    업로드
                  </label>
                  <input
                    name="event_logo"
                    type="file"
                    id="event_logo"
                    onChange={_onChange}
                    placeholder={"jpg, png, 528x170px, maximum file size 20KB"}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input
                type="checkbox"
                name="guide_yn"
                checked={guide_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>

            <td className="virtual-table-name">가이드 영상</td>
            <td>
              <input
                type="url"
                name="guide_url"
                className="upload_text"
                value={guide_url || ""}
                placeholder={"VOD Address"}
                style={{ width: "100%" }}
                onChange={_onChange}
              />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input
                type="checkbox"
                name="channeltalk_yn"
                checked={channeltalk_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>

            <td className="virtual-table-name">Technical Support key</td>
            <td>
              <input
                type="url"
                name="channeltalk_key"
                className="upload_text"
                value={channeltalk_key || ""}
                placeholder={"key"}
                style={{ width: "100%" }}
                onChange={_onChange}
              />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input
                type="checkbox"
                name="playground_yn"
                checked={playground_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">플레이 그라운드</td>
            <td />
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-checkbox">
              <input
                type="checkbox"
                name="stamp_yn"
                checked={stamp_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">Event</td>
            <td>
              <text className="upload_text">스탬프 투어 이벤트</text>
            </td>
          </tr>
        </tbody>
      </table>
      <span style={{ marginTop: 20 }}>
        <text className="bottom_text1">
          {" "}
          체크박스를 해제하시면 메뉴바에 표시되지 않습니다.
        </text>
        <text className="bottom_text2">
          {" "}
          ※ 콘텐츠 미삽입 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로
          출력됩니다.
        </text>
      </span>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default ETCTable;
