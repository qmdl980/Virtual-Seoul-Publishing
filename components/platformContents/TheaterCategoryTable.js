import React from "react";
import TitleForm from "../odc/TitleForm";

const TheaterCategoryTable = ({inputs, _onChange, _changeImg, _contentSave}) => {
    const {category_1, category_2, category_3, category_4, category_5} = inputs;

    return (
        <div>
            <TitleForm title={"카테고리 설정"}>
                {" "}
            </TitleForm>
            <table id="platform-table">
                <thead>
                <tr>
                    <th className="virtual-table-th" style={{width: "30vw"}}>
                        카테고리 이름
                    </th>
                    <th className="virtual-table-th">커버 이미지</th>
                    <th className="virtual-table-th" style={{width: "10vw"}}/>
                </tr>
                </thead>
                <tbody>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        <input type={"text"}
                               placeholder={"category1"}
                               name={"category_1"}>
                        </input>
                    </td>
                    <td className="virtual-table-checkbox">
                        {category_1 ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="category_1"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="category_1"
                                    htmlFor="category_1"
                                >
                                    업로드
                                </label>
                                <input
                                    name="category_1"
                                    type="file"
                                    id="category_1"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{display: "none"}}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-name">
                        <button
                            className="input-file-button"
                            name="check_category_1"
                        >
                            확인
                        </button>
                    </td>
                </tr>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        <input type={"text"}
                               placeholder={"category2"}
                               name={"category_2"}>
                        </input>
                    </td>
                    <td className="virtual-table-checkbox">
                        {category_2 ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="category_2"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="category_2"
                                    htmlFor="category_2"
                                >
                                    업로드
                                </label>
                                <input
                                    name="category_2"
                                    type="file"
                                    id="category_2"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-name">
                        <button
                            className="input-file-button"
                            name="check_category_2"
                        >
                            확인
                        </button>
                    </td>
                </tr>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        <input type={"text"}
                               placeholder={"category3"}
                               name={"category_3"}>
                        </input>
                    </td>
                    <td className="virtual-table-checkbox">
                        {category_3 ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="category_3"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="category_3"
                                    htmlFor="category_3"
                                >
                                    업로드
                                </label>
                                <input
                                    name="category_3"
                                    type="file"
                                    id="category_3"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-name">
                        <button
                            className="input-file-button"
                            name="check_category_3"
                        >
                            확인
                        </button>
                    </td>
                </tr>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        <input type={"text"}
                               placeholder={"category4"}
                               name={"category_4"}>
                        </input>
                    </td>
                    <td className="virtual-table-checkbox">
                        {category_4 ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="category_4"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="category_4"
                                    htmlFor="category_4"
                                >
                                    업로드
                                </label>
                                <input
                                    name="category_4"
                                    type="file"
                                    id="category_4"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-name">
                        <button
                            className="input-file-button"
                            name="check_category_4"
                        >
                            확인
                        </button>
                    </td>
                </tr>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-name">
                        <input type={"text"}
                               placeholder={"category5"}
                               name={"category_5"}>
                        </input>
                    </td>
                    <td className="virtual-table-checkbox">
                        {category_5 ? (
                            <>
                                <button
                                    className="input-file-button"
                                    name="category_5"
                                    onClick={_changeImg}
                                >
                                    변경
                                </button>
                            </>
                        ) : (
                            <>
                                <label
                                    className="input-file-button"
                                    name="category_5"
                                    htmlFor="category_5"
                                >
                                    업로드
                                </label>
                                <input
                                    name="category_5"
                                    type="file"
                                    id="category_5"
                                    onChange={_onChange}
                                    placeholder={"jpg, png, 512x108px, maximum file size 20KB"}
                                    style={{ display: "none" }}
                                />
                            </>
                        )}
                    </td>
                    <td className="virtual-table-name">
                        <button
                            className="input-file-button"
                            name="check_category_5"
                        >
                            확인
                        </button>
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    );
};

export default TheaterCategoryTable;
