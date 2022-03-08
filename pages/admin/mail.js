import AdminDocHeader from "../../components/layout/AdminDocHeader";
import AdminHeader from "../../components/layout/AdminHeader";
import AdminNavbar from "../../components/layout/AdminNavbar";
import EventCreate from "../../components/odc/EventCreate";
import React from "react";

const Mail = () => {
    return (
        <>
            <AdminDocHeader title={"HOME"} />
            <div className="wrap">
                <AdminHeader />
                <AdminNavbar />
                <div className="contents">
                    <div className="contents__wrap">
                        <div className="mail-container">
                            <div className="mail-participant-form">
                                <h2>DB등록 일반 참가자에게 보내는 메일</h2>
                                <table className="mail-form">
                                    <tbody>
                                    <tr className="mail-title-tr">
                                        <td className="mail-td1">
                                            Mail Title
                                        </td>
                                        <td className="mail-input-td1">
                                            <input />
                                        </td>
                                    </tr>

                                    <tr className="mail-scripts-tr">
                                        <td className="mail-td2">
                                            Mail Scripts
                                        </td>
                                        <td className="mail-input-td2">
                                            <textarea />
                                        </td>
                                    </tr>

                                    <tr className="mail-receiver-tr">
                                        <td className="mail-td1">@</td>
                                        <td className="mail-input-td3">
                                            <input></input>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>

                            </div>
                            <div className="mail-company-form">
                                <h2>전시 기업 등록시 참가사에게 보내는 메일</h2>
                                <table className="mail-form">
                                    <tbody>
                                    <tr className="mail-title-tr">
                                        <td className="mail-td1">
                                            Mail Title
                                        </td>
                                        <td className="mail-input-td1">
                                            <input />
                                        </td>
                                    </tr>

                                    <tr className="mail-scripts-tr">
                                        <td className="mail-td2">
                                            Mail Scripts
                                        </td>
                                        <td className="mail-input-td2">
                                            <textarea />
                                        </td>
                                    </tr>

                                    <tr className="mail-receiver-tr">
                                        <td className="mail-td1">@</td>
                                        <td className="mail-input-td3">
                                            <input></input>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="mail-password-reset-form">
                                <h2>비밀번호 리셋 메일</h2>
                                <table className="mail-form">
                                    <tbody>
                                    <tr className="mail-title-tr">
                                        <td className="mail-td1">
                                            Mail Title
                                        </td>
                                        <td className="mail-input-td1">
                                            <input />
                                        </td>
                                    </tr>

                                    <tr className="mail-scripts-tr">
                                        <td className="mail-td2">
                                            Mail Scripts
                                        </td>
                                        <td className="mail-input-td2">
                                            <textarea />
                                        </td>
                                    </tr>

                                    <tr className="mail-receiver-tr">
                                        <td className="mail-td1">@</td>
                                        <td className="mail-input-td3">
                                            <input></input>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}

export default Mail;