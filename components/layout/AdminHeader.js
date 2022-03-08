import React from "react";

const AdminHeader = () => {
    const logout = (e) => {
        location.href = "/admin/logout";
    };

    return (
        <div className="header">
            <div className="header__logo">
                <img src="/images/vslogo.png" alt="logo" />
            </div>
            <h1 className="header__title">Admin</h1>
            <div className="header__userInfo">
                <p
                    className="header__userName"
                    style={{ cursor: "pointer", marginRight:"5px" }}
                    onClick={(e) => {
                        location.href = "/admin/myInfo";
                    }}
                >
                    Admin
                </p>
                <div className={"triangle_down"} style={{marginRight:"10px"}}></div>

                <button className="header__logout" onClick={logout}>
                    log-out
                </button>
            </div>
        </div>
    );
};

export default AdminHeader;
