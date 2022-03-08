import React from "react";
import {useRouter} from "next/router";

const AdminNavbar = () => {
    const {pathname} = useRouter();

    return (
        <ul className="menu">
            <li
                className={"menu__item" + (pathname === "/admin/home" ? " on" : "")}
                onClick={(e) => {
                    location.href = "/admin/home";
                }}
            >
                Home
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/admin/pco" || pathname.startsWith("/admin/pco/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/admin/pco";
                }}
            >
                계정 관리
            </li>
            {/* <li
        className={
          "menu__item" +
          (pathname === "/admin/pcoUser" ||
          pathname.startsWith("/admin/pcoUser/")
            ? " on"
            : "")
        }
        onClick={(e) => {
          location.href = "/admin/pcoUser";
        }}
      >
        <img src="/images/user_w.png" alt="user"></img>
        PCO User
      </li> */}
            {/* <li
        className={
          "menu__item" +
          (pathname === "/admin/event" || pathname.startsWith("/admin/event/")
            ? " on"
            : "")
        }
        onClick={(e) => {
          location.href = "/admin/event";
        }}
      >
        <img src="/images/event_w.png" alt="event"></img>
        Event
      </li> */}
            {/* <li
        className={
          "menu__item" +
          (pathname === "/admin/schedule" ||
          pathname.startsWith("/admin/schedule/")
            ? " on"
            : "")
        }
        onClick={(e) => {
          location.href = "/admin/schedule";
        }}
      >
        <img src="/images/schedule_w.png" alt="schedule"></img>
        Schedule
      </li> */}
        </ul>
    );
};

export default AdminNavbar;
