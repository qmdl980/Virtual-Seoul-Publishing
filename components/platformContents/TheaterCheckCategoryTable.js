import React from "react";
import TitleForm from "../odc/TitleForm";

const TheaterCheckCategoryTable = (props) => {

    const data = [{
        idx:1,
        vod_name:"BTS",
        vod_url:"youtube.com"
    }]

    const rendering = () => {
        const result = [];

        for(let i = 0; i < data.length; i++){
            result.push(
                <tr key={i}
                    className="virtual-table-tr">
                    <td className="virtual-table-name">
                        <div>{data[i].idx}</div>
                    </td>
                    <td className="virtual-table-name">
                        <div>{data[i].vod_name}</div>
                    </td>
                    <td className="virtual-table-checkbox">
                        <div>{data[i].vod_url}</div>
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

    return(
        <div>
            <div>
                <TitleForm title={props.categoryName}>
                    {" "}
                </TitleForm>
                <button className={"input-file-button"}>VOD 추가</button>
            </div>

            <table id="platform-table">
                <thead>
                <tr>
                    <th className="virtual-table-th" style={{width: "5%"}}>idx</th>
                    <th className="virtual-table-th" style={{width: "30%"}}>
                        VOD Name
                    </th>
                    <th className="virtual-table-th">VOD url</th>
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

export default TheaterCheckCategoryTable;
