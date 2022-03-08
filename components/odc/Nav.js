import React from "react";
import Link from "next/link";
const Nav = () => {
    return (
        <div className="nav-container">
            <div className="nav-menu-1">
                <Link href="/admin">
                    <a>Home</a>
                </Link>
                <Link href="#">
                    <a>대쉬보드</a>
                </Link>
                <Link href="/admin/eventcreate">
                    <a>이벤트 생성</a>
                </Link>
                <Link href="/admin/eventinfo">
                    <a>이벤트 정보</a>
                </Link>
                <Link href="/admin/mail">
                    <a>메일 폼</a>
                </Link>
                <Link href="#">
                    <a>참가자 / 스피커</a>
                </Link>
                <Link href="/admin/myaccount">
                    <a>내 계정</a>
                </Link>
            </div>

            <hr></hr>


        </div>
    );

}

export default Nav;