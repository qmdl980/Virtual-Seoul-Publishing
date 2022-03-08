import React from "react";

const ExhibitionHallKioskTable = ({
  inputs,
  _onChange,
  _contentSave,
  _changeImg,
}) => {
  const {
    name,
    kiosk_cover1,
    kiosk_cover2,
    kiosk_cover3,
    booth_kiosk_cover,
    site_link,
    floor_map,
    survey_link,
    brochure_url,
  } = inputs;
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
            <th className="virtual-table-th">입력</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">키오스크 커버 1</td>
            <td className="virtual-table-checkbox">
              {kiosk_cover1 ? (
                <>
                  <button
                    className="input-file-button"
                    name="kiosk_cover1"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="kiosk_cover1"
                    htmlFor="kiosk_cover1"
                  >
                    업로드
                  </label>
                  <input
                    name="kiosk_cover1"
                    type="file"
                    id="kiosk_cover1"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">링크</td>
            <td className="virtual-table-checkbox">
              <input
                type="text"
                name="site_link"
                value={site_link || ""}
                onChange={_onChange}
                style={{ width: "100%" }}
                placeholder={"보도자료 페이지 링크 입력"}
              />
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">키오스크 커버 2</td>
            <td className="virtual-table-checkbox">
              {kiosk_cover2 ? (
                <>
                  <button
                    className="input-file-button"
                    name="kiosk_cover2"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="kiosk_cover2"
                    htmlFor="kiosk_cover2"
                  >
                    업로드
                  </label>
                  <input
                    name="kiosk_cover2"
                    type="file"
                    id="kiosk_cover2"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">플로어 맵 이미지</td>
            <td className="virtual-table-checkbox">
              {floor_map ? (
                <>
                  <button
                    className="input-file-button"
                    name="floor_map"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="floor_map"
                    htmlFor="floor_map"
                  >
                    업로드
                  </label>
                  <input
                    name="floor_map"
                    type="file"
                    id="floor_map"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">키오스크 커버 3</td>
            <td className="virtual-table-checkbox">
              {kiosk_cover3 ? (
                <>
                  <button
                    className="input-file-button"
                    name="kiosk_cover3"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="kiosk_cover3"
                    htmlFor="kiosk_cover3"
                  >
                    업로드
                  </label>
                  <input
                    name="kiosk_cover3"
                    type="file"
                    id="kiosk_cover3"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">{/* 설문링크 */}</td>
            <td className="virtual-table-checkbox">
              {/* <input
                type="text"
                name="survey_link"
                value={survey_link || ""}
                onChange={_onChange}
                style={{ width: "100%" }}
                placeholder={"https://~"}
              /> */}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">키오스크 커버 4</td>
            <td className="virtual-table-checkbox">
              {booth_kiosk_cover ? (
                <>
                  <button
                    className="input-file-button"
                    name="booth_kiosk_cover"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="booth_kiosk_cover"
                    htmlFor="booth_kiosk_cover"
                  >
                    업로드
                  </label>
                  <input
                    name="booth_kiosk_cover"
                    type="file"
                    id="booth_kiosk_cover"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">브로셔</td>
            <td className="virtual-table-checkbox">
              {brochure_url ? (
                <>
                  <button
                    className="input-file-button"
                    name="brochure_url"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="brochure_url"
                    htmlFor="brochure_url"
                  >
                    업로드
                  </label>
                  <input
                    name="brochure_url"
                    type="file"
                    id="brochure_url"
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

export default ExhibitionHallKioskTable;
