import React from "react";

const ExhibitionHallBannerTable = ({
  inputs,
  _onChange,
  _contentSave,
  _changeImg,
}) => {
  const {
    name,
    left_spon_banner1,
    left_spon_banner2,
    left_spon_banner3,
    left_spon_banner4,
    right_spon_banner1,
    right_spon_banner2,
    right_spon_banner3,
    right_spon_banner4,
  } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "15vw" }}>
              항목
            </th>
            <th className="virtual-table-th">파일</th>
            <th className="virtual-table-th" style={{ width: "15vw" }}>
              항목
            </th>
            <th className="virtual-table-th">파일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">왼쪽 배너 1</td>
            <td className="virtual-table-checkbox">
              {left_spon_banner1 ? (
                <>
                  <button
                    className="input-file-button"
                    name="left_spon_banner1"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="left_spon_banner1"
                    htmlFor="left_spon_banner1"
                  >
                    업로드
                  </label>
                  <input
                    name="left_spon_banner1"
                    type="file"
                    id="left_spon_banner1"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">오른쪽 배너 1</td>
            <td className="virtual-table-checkbox">
              {right_spon_banner1 ? (
                <>
                  <button
                    className="input-file-button"
                    name="right_spon_banner1"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="right_spon_banner1"
                    htmlFor="right_spon_banner1"
                  >
                    업로드
                  </label>
                  <input
                    name="right_spon_banner1"
                    type="file"
                    id="right_spon_banner1"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">왼쪽 배너 2</td>
            <td className="virtual-table-checkbox">
              {left_spon_banner2 ? (
                <>
                  <button
                    className="input-file-button"
                    name="left_spon_banner2"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="left_spon_banner2"
                    htmlFor="left_spon_banner2"
                  >
                    업로드
                  </label>
                  <input
                    name="left_spon_banner2"
                    type="file"
                    id="left_spon_banner2"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">오른쪽 배너 2</td>
            <td className="virtual-table-checkbox">
              {right_spon_banner2 ? (
                <>
                  <button
                    className="input-file-button"
                    name="right_spon_banner2"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="right_spon_banner2"
                    htmlFor="right_spon_banner2"
                  >
                    업로드
                  </label>
                  <input
                    name="right_spon_banner2"
                    type="file"
                    id="right_spon_banner2"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">왼쪽 배너 3</td>
            <td className="virtual-table-checkbox">
              {left_spon_banner3 ? (
                <>
                  <button
                    className="input-file-button"
                    name="left_spon_banner3"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="left_spon_banner3"
                    htmlFor="left_spon_banner3"
                  >
                    업로드
                  </label>
                  <input
                    name="left_spon_banner3"
                    type="file"
                    id="left_spon_banner3"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">오른쪽 배너 3</td>
            <td className="virtual-table-checkbox">
              {right_spon_banner3 ? (
                <>
                  <button
                    className="input-file-button"
                    name="right_spon_banner3"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="right_spon_banner3"
                    htmlFor="right_spon_banner3"
                  >
                    업로드
                  </label>
                  <input
                    name="right_spon_banner3"
                    type="file"
                    id="right_spon_banner3"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
          </tr>
          <tr className="virtual-table-tr">
            <td className="virtual-table-name">왼쪽 배너 4</td>
            <td className="virtual-table-checkbox">
              {left_spon_banner4 ? (
                <>
                  <button
                    className="input-file-button"
                    name="left_spon_banner4"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="left_spon_banner4"
                    htmlFor="left_spon_banner4"
                  >
                    업로드
                  </label>
                  <input
                    name="left_spon_banner4"
                    type="file"
                    id="left_spon_banner4"
                    onChange={_onChange}
                    style={{ display: "none" }}
                  />
                </>
              )}
            </td>
            <td className="virtual-table-name">오른쪽 배너 4</td>
            <td className="virtual-table-checkbox">
              {right_spon_banner4 ? (
                <>
                  <button
                    className="input-file-button"
                    name="right_spon_banner4"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="right_spon_banner4"
                    htmlFor="right_spon_banner4"
                  >
                    업로드
                  </label>
                  <input
                    name="right_spon_banner4"
                    type="file"
                    id="right_spon_banner4"
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

export default ExhibitionHallBannerTable;
