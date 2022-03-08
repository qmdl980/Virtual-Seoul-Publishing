import React from "react";

const LoadingTable = (props) => {
    return (
        <div id="virtual-container">
            <table id="virtual-table">
                <thead>
                <tr>
                    <th className="virtual-table-th">메뉴 이름 변경</th>
                    <th className="virtual-table-th">영문</th>
                    <th className="virtual-table-th">한글</th>
                </tr>
                </thead>
                <tbody>
                <tr className="virtual-table-tr">
                    <td className="virtual-table-checkbox">
                        <input type="text" name="menuName" value="" placeholder={props.menuName}/>
                    </td>
                    <td className="virtual-table-checkbox">
                        <input type="text" name="menuNameENG"/>
                    </td>
                    <td className="virtual-table-checkbox">
                        <input type="text" name="menuNameKOR"/>
                    </td>
                </tr>
                </tbody>
            </table>
            <p style={{color: "#252525"}}> 로고를 삭제하고 싶으면 체크를 해제하시면 됩니다.</p>
            <button className="virtual-setting-btn">SAVE</button>
        </div>
    );
};

export default LoadingTable;
