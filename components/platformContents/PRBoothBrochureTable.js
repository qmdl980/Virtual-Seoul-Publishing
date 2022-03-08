import React from "react";
import TitleForm from "../odc/TitleForm";

const PRBoothBrochureTable = ({inputs, _onChange, _changeImg, _contentSave}) => {

    const {
        brochure,
        cover_img
    } = inputs;

    const brochureData = [{
        idx: 1,
        brochure: "BTS",
        brochure_cover: "youtube.com"
    },
        {
            idx: 1,
            brochure: "BTS",
            brochure_cover: "youtube.com"
        }]

    const clickBtn = () => {

    }

    const rendering = () => {
        const result = [];

        for (let i = 0; i < brochureData.length; i++) {
            result.push(
                <tr key={i}
                    className="virtual-table-tr">
                    <td className={"virtual-table-checkbox"}>{brochureData[i].idx}</td>
                    <td className="virtual-table-checkbox">
                        {brochureData[i].brochure ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="brochure"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="brochure"
                                    htmlFor="brochure"
                                >
                                    업로드
                                </label>
                                <input
                                    name="brochure"
                                    type="file"
                                    id="brochure"
                                    onChange={_onChange}
                                    placeholder={"pdf"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-checkbox">
                        {brochureData[i].brochure_cover ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="brochure_cover"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="brochure_cover"
                                    htmlFor="brochure_cover"
                                >
                                    업로드
                                </label>
                                <input
                                    name="brochure_cover"
                                    type="file"
                                    id="brochure_cover"
                                    onChange={_onChange}
                                    placeholder={"jpg"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-name">
                        <button
                            className="input-file-button"
                            name="delete_vod"
                        >
                            delete
                        </button>
                    </td>
                </tr>
            )
        }
        return result;
    }

    return (
        <div>

            <div>
                <TitleForm title="Brochure">
                    {" "}
                </TitleForm>
                <button
                    className={"input-file-button"} onClick={() => clickBtn}>
                    추가
                </button>
            </div>

            <table id="platform-table">
                <thead>
                <tr>
                    <th className="virtual-table-th" style={{width: "5%"}}>idx</th>
                    <th className="virtual-table-th" style={{width: "42.5%"}}>
                        Brochure
                    </th>
                    <th className="virtual-table-th" style={{width: "42.5%"}}>
                        Brochure Cover
                    </th>
                    <th className="virtual-table-th" style={{width: "10%"}}>delete</th>
                </tr>
                </thead>
                <tbody>

                {rendering()}

                </tbody>
            </table>

        </div>
    );
};
export default PRBoothBrochureTable;
