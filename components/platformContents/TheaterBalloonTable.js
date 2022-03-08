import React from "react";
import TitleForm from "../odc/TitleForm";

const TheaterBalloonTable = ({ inputs, _onChange, _changeImg, _contentSave }) => {
    const {left_logo, right_logo} = inputs;

    return (
        <div>
            <TitleForm title={"Balloon logo"}>
                {" "}
            </TitleForm>

            <table id="platform-table">
                <thead>
                <tr>
                    <th className="virtual-table-th" style={{width: "30%"}}>
                        항목
                    </th>
                    <th className="virtual-table-th">파일</th>
                </tr>
                </thead>
                <tbody>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        좌측 로고
                    </td>
                    <td className="virtual-table-name">
                        {left_logo ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="left_logo"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="left_logo"
                                    htmlFor="left_logo"
                                >
                                    업로드
                                </label>
                                <input
                                    name="left_logo"
                                    type="file"
                                    id="left_logo"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </td>
                </tr>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        우측 로고
                    </td>
                    <td className="virtual-table-name">
                        {right_logo ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="right_logo"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="right_logo"
                                    htmlFor="right_logo"
                                >
                                    업로드
                                </label>
                                <input
                                    name="right_logo"
                                    type="file"
                                    id="right_logo"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </td>
                </tr>

                </tbody>
            </table>
            <button className="virtual-setting-btn" onClick={_contentSave}>
                SAVE
            </button>
        </div>
    );
};

export default TheaterBalloonTable;
