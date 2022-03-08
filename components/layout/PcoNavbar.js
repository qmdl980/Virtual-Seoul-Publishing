import React from "react";
import {useRouter} from "next/router";

const AdminNavbar = () => {
    const {pathname} = useRouter();
    // console.log("pathname ::", pathname);
    return (
        <div className="menu">
            <li
                className={"menu__item" + (pathname === "/mice/home" ? " on" : "")}
                onClick={(e) => {
                    location.href = "/mice/home";
                }}
            >
                Home
            </li>
            <li
              className={ "menu__item" +
                          (pathname === "/mice/dashboard" || pathname.startsWith("/mice/dashboard/")
                          ? " on"
                          : "")
                        }
              onClick={(e) => {
                location.href = "/mice/dashboard";
              }}
            >
              대시보드
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/event" || pathname.startsWith("/mice/event/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/event";
                }}
            >
                이벤트 정보
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/mail" || pathname.startsWith("/mice/mail/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/mail";
                }}
            >
                메일 폼
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/people" || pathname.startsWith("/mice/people/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/people";
                }}
            >
                참가자 / 스피커
            </li>
            <li className={"menu__block"}/>
            <li className={"menu__block"} style={{paddingBottom: "0rem"}}>Platform Contents</li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/loading" || pathname.startsWith("/mice/loading/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/loading";
                }}
            >
                <div className={"triangle_right"}></div>
                로딩 화면
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/lobby" || pathname.startsWith("/mice/lobby/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/lobby";
                }}
            >
                <div className={"triangle_right"}></div>
                로비
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/conferenceHall" || pathname.startsWith("/mice/conferenceHall/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/conferenceHall";
                }}
            >
                <div className={"triangle_right"}></div>
                컨퍼런스 홀
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/openStage" || pathname.startsWith("/mice/openStage/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/openStage";
                }}
            >
                <div className={"triangle_right"}></div>
                오픈 스테이지
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/boardRoom" || pathname.startsWith("/mice/boardRoom/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/boardRoom";
                }}
            >
                <div className={"triangle_right"}></div>
                보드룸
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/exhibitionHall" || pathname.startsWith("/mice/exhibitionHall/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/exhibitionHall";
                }}
            >
                <div className={"triangle_right"}></div>
                전시홀
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/businessConsulting" || pathname.startsWith("/mice/businessConsulting/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/businessConsulting";
                }}
            >
                <div className={"triangle_right"}></div>
                비즈니스 상담장
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/theater" || pathname.startsWith("/mice/theater/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/theater";
                }}
            >
                <div className={"triangle_right"}></div>
                시어터
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/prBooth" || pathname.startsWith("/mice/prBooth/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/prBooth";
                }}
            >
                <div className={"triangle_right"}></div>
                홍보부스
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/networkLounge" || pathname.startsWith("/mice/networkLounge/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/networkLounge";
                }}
            >
                <div className={"triangle_right"}></div>
                네트워킹 라운지
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/platformETC" || pathname.startsWith("/mice/platformETC/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/platformETC";
                }}
            >
                <div className={"triangle_right"}></div>
                기타
            </li>

            <li className={"menu__block"}/>
            <li className={"menu__block"} style={{paddingBottom: "0rem"}}>Conference</li>

            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/program" || pathname.startsWith("/mice/program/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/program";
                }}
            >
                <div className={"triangle_right"}></div>
                Program
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/conferenceReplay" || pathname.startsWith("/mice/conferenceReplay/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/conferenceReplay";
                }}
            >
                <div className={"triangle_right"}></div>
                Replay
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/conferenceTranslation" || pathname.startsWith("/mice/conferenceTranslation/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/conferenceTranslation";
                }}
            >
                <div className={"triangle_right"}></div>
                Translation
            </li>

            <li className={"menu__block"}/>
            <li className={"menu__block"} style={{paddingBottom: "0rem"}}>Exhibition</li>

            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/exhibitionBooth" || pathname.startsWith("/mice/exhibitionBooth/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/exhibitionBooth";
                }}
            >
                <div className={"triangle_right"}></div>
                전시부스
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/exhibitionCompany" || pathname.startsWith("/mice/exhibitionCompany/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/exhibitionCompany";
                }}
            >
                <div className={"triangle_right"}></div>
                전시업체
            </li>
            <li
                className={
                    "menu__item" +
                    (pathname === "/mice/sponsor" || pathname.startsWith("/mice/sponsor/")
                        ? " on"
                        : "")
                }
                onClick={(e) => {
                    location.href = "/mice/sponsor";
                }}
            >
                <div className={"triangle_right"}></div>
                스폰서등록
            </li>

            {/*
                <li className={"menu__block"}/>
                <li className={"menu__block"} style={{paddingBottom: "0rem"}}>----------------------</li>

                <li
                className={
                "menu__item" +
                (pathname === "/mice/schedule" || pathname.startsWith("/mice/schedule/")
                ? " on"
                : "")
            }
                onClick={(e) => {
                location.href = "/mice/schedule";
            }}
                >
                <p style={{display: "inline-block", fontSize: "2rem", marginLeft: "1vw"}}>&#8227;</p>
                Schedule
                </li>

                <li
                className={
                "menu__item" +
                (pathname === "/mice/session" || pathname.startsWith("/mice/session/")
                ? " on"
                : "")
            }
                onClick={(e) => {
                location.href = "/mice/session";
            }}
                >
                <img src="/images/session_w.png" alt="session"></img>
                Session
                </li>
                <li
                className={
                "menu__item" +
                (pathname === "/mice/presentation" ||
                pathname.startsWith("/mice/presentation/")
                ? " on"
                : "")
            }
                onClick={(e) => {
                location.href = "/mice/presentation";
            }}
                >
                <img src="/images/presentation_w.png" alt="presentation"></img>
                Presentation
                </li>

                <li
                className={
                "menu__item" +
                (pathname === "/mice/sessionPeople" ||
                pathname.startsWith("/mice/sessionPeople/")
                ? " on"
                : "")
            }
                onClick={(e) => {
                location.href = "/mice/sessionPeople";
            }}
                >
                <img src="/images/sessionpeople_w.png" alt="sessionPeople"></img>
                Speaker Role
                </li>

                <li
                className={
                "menu__item" +
                (pathname === "/mice/user" || pathname.startsWith("/mice/user/")
                ? " on"
                : "")
            }
                onClick={(e) => {
                location.href = "/mice/user";
            }}
                >
                <img src="/images/user_w.png" alt="user"></img>
                User
                </li>
            */}
        </div>
    );
};

export default AdminNavbar;
