import React from "react";
import TitleForm from "../odc/TitleForm";

const PRBoothKioskTable = ({inputs, _onChange, _contentSave, _changeImg}) => {
    const {
        left_cover,
        right_cover,
        left_url,
        right_url
    } = inputs;

    return (
        <div>
            <TitleForm title="Banner">
                {" "}
            </TitleForm>
            <table id="platform-table">
                <thead>
                <tr>
                    <th className="virtual-table-th" style={{width: "5%"}}>
                        idx
                    </th>
                    <th className="virtual-table-th" style={{width: "30%"}}>
                        항목
                    </th>
                    <th className="virtual-table-th" style={{width:"32.5%"}}>파일</th>
                    <th className="virtual-table-th" style={{width:"32.5%"}}>링크 입력</th>
                </tr>
                </thead>
                <tbody>
                <tr className="virtual-table-tr">
                    <td className={"virtual-table-checkbox"}>1</td>
                    <td className="virtual-table-name">키오스크 좌측</td>
                    <td className="virtual-table-checkbox">
                        {left_cover ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="left_cover"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="left_cover"
                                    htmlFor="left_cover"
                                >
                                    업로드
                                </label>
                                <input
                                    name="left_cover"
                                    type="file"
                                    id="left_cover"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                    <td>
                        <input
                            type={"text"}
                            placeholder={"Enter the link url"}
                            name={"left_url"}
                            id={"left_url"}
                            style={{width:"100%"}}
                        />
                    </td>
                </tr>


                <tr className={"virtual-table-tr"}>
                    <td className={"virtual-table-checkbox"}>2</td>
                    <td className="virtual-table-name">스크린 영상 커버</td>
                    <td className="virtual-table-checkbox">
                        {right_cover ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="right_cover"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="right_cover"
                                    htmlFor="right_cover"
                                >
                                    업로드
                                </label>
                                <input
                                    name="right_cover"
                                    type="file"
                                    id="right_cover"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                    <td>
                        <input
                            type={"text"}
                            placeholder={"Enter the link url"}
                            name={"right_url"}
                            id={"right_url"}
                            style={{width:"100%"}}
                        />
                    </td>
                </tr>


                </tbody>
            </table>

            <p style={{color: "#252525"}}>
                {" "}
                콘텐츠 미삽입 시 샘플로 등록된 콘텐츠(이미지 또는 영상)으로
                출렵됩니다.
            </p>
            <button className="virtual-setting-btn" onClick={_contentSave}>
                SAVE
            </button>
        </div>
    );
};

export default PRBoothKioskTable;
