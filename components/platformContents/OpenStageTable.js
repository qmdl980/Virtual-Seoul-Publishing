import React from "react";

const OpenStageTable = ({ inputs, _onChange, _contentSave, _changeImg }) => {
  const {
    name,
    adballoon_cover,
    replay_yn,
    replay_cover,
    profile_yn,
    profile_cover,
  } = inputs;
  return (
    <div>
      <table id="platform-table">
        <thead>
          <tr>
            <th className="virtual-table-th" style={{ width: "5vw" }}>
              선택
            </th>
            <th className="virtual-table-th" style={{ width: "30vw" }}>
              항목
            </th>
            <th className="virtual-table-th">파일</th>
          </tr>
        </thead>
        <tbody>
          <tr className="virtual-table-tr">
            <td />
            <td className="virtual-table-name">벌룬 배너</td>
            <td className="virtual-table-checkbox">
              {adballoon_cover ? (
                <>
                  <button
                    className="input-file-button"
                    name="adballoon_cover"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="adballoon_cover"
                    htmlFor="adballoon_cover"
                  >
                    업로드
                  </label>
                  <input
                    name="adballoon_cover"
                    type="file"
                    id="adballoon_cover"
                    onChange={_onChange}
                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
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
                name="replay_yn"
                checked={replay_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">(좌)다시보기</td>
            <td className="virtual-table-checkbox">
              {replay_cover ? (
                <>
                  <button
                    className="input-file-button"
                    name="replay_cover"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="replay_cover"
                    htmlFor="replay_cover"
                  >
                    업로드
                  </label>
                  <input
                    name="replay_cover"
                    type="file"
                    id="replay_cover"
                    onChange={_onChange}
                    placeholder={"jpg, png, 723x844px, maximum file size 300KB"}
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
                name="profile_yn"
                checked={profile_yn === "Y" ? true : false}
                onChange={_onChange}
              />
            </td>
            <td className="virtual-table-name">(우)연사정보</td>
            <td className="virtual-table-checkbox">
              {profile_cover ? (
                <>
                  <button
                    className="input-file-button"
                    name="profile_cover"
                    onClick={_changeImg}
                  >
                    변경
                  </button>
                </>
              ) : (
                <>
                  <label
                    className="input-file-button"
                    name="profile_cover"
                    htmlFor="profile_cover"
                  >
                    업로드
                  </label>
                  <input
                    name="profile_cover"
                    type="file"
                    id="profile_cover"
                    onChange={_onChange}
                    placeholder={"jpg, png, 723x844px, maximum file size 300KB"}
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
        다시 보기, 연사정보 보기 기능은 컨퍼런스장과 동일합니다.
      </p>
      <p style={{ color: "#252525" }}>
        {" "}
        콘텐츠 미삽ㅇ비 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로
        출렵됩니다.
      </p>
      <button className="virtual-setting-btn" onClick={_contentSave}>
        SAVE
      </button>
    </div>
  );
};

export default OpenStageTable;
