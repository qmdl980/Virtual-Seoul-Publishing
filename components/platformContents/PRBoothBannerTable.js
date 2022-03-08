import React from "react";
import TitleForm from "../odc/TitleForm";

const PRBoothBannerTable = ({inputs, _onChange, _contentSave, _changeImg}) => {
    const {
        upper_banner,
        video_cover,
        video_url,
        left_logo,
        right_logo
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
                    <th className="virtual-table-th">파일</th>
                </tr>
                </thead>
                <tbody>
                <tr className="virtual-table-tr">
                    <td className={"virtual-table-checkbox"}>1</td>
                    <td className="virtual-table-name">상단 롤링 배너</td>
                    <td className="virtual-table-checkbox">
                        {upper_banner ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="upper_banner"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="upper_banner"
                                    htmlFor="upper_banner"
                                >
                                    업로드
                                </label>
                                <input
                                    name="upper_banner"
                                    type="file"
                                    id="upper_banner"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                </tr>


                <tr className={"virtual-table-tr"}>
                    <td className={"virtual-table-checkbox"} rowSpan={'2'}>2</td>
                    <td className="virtual-table-name">스크린 영상 커버</td>
                    <td className="virtual-table-checkbox">
                        {video_cover ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="video_cover"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="video_cover"
                                    htmlFor="video_cover"
                                >
                                    업로드
                                </label>
                                <input
                                    name="video_cover"
                                    type="file"
                                    id="video_cover"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                </tr>
                <tr className={"virtual-table-tr"}>

                    <td className="virtual-table-name">스크린 영상 주소</td>
                    <td className="virtual-table-checkbox">
                        <input
                            type={"text"}
                            placeholder={"enter streaming address"}
                            name={"video_url"}
                            id={"video_url"}
                            style={{width:"100%"}}
                        />
                    </td>
                </tr>
                <tr className={"virtual-table-tr"}>
                    <td className={"virtual-table-checkbox"}>3</td>
                    <td className="virtual-table-name">프론트 좌측 로고</td>
                    <td className="virtual-table-checkbox">
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
                                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                </tr>
                <tr className={"virtual-table-tr"}>
                    <td className={"virtual-table-checkbox"}>4</td>
                    <td className="virtual-table-name">프론트 우측 로고</td>
                    <td className="virtual-table-checkbox">
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
                                    placeholder={"jpg, png, 800x800px, maximum file size 500KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
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

export default PRBoothBannerTable;
