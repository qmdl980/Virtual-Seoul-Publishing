import React from "react";
import TitleForm from "./TitleForm";


const EventInfo = () => {
    const EventData = [
        {
            eventName: "서울트래블마트",
            eventCode: "sitm001",
            startDate: "2021-09-20",
            endDate: "2021-09-23",
            eventDomain: "https://domain.virtualseoul.or.kr",
            defaultTime: "GMT +09 KOREA",
            language: "한국어",
            participatingOption: "참가자 DB 직접 등록"
        }
    ]

    return (
        <div>
            <TitleForm
                title="행사 정보"
                detail="행사 상세정보를 입력하세요."
            ></TitleForm>
            <div className="grid-container">
                <div className="grid-item grid-title-1 grid-row-1">행사명</div>
                <div className="grid-item grid-input-1 grid-row-1">
                    <input className="grid-input-box" type="text" />
                </div>
                <div className="grid-item grid-title-2 grid-row-1">행사 코드</div>
                <div className="grid-item grid-input-2 grid-row-1">
                    <input className="grid-input-box" type="text" />
                </div>
                <div className="grid-item grid-title-1 grid-row-2">시작일</div>
                <div className="grid-item grid-input-1 grid-row-2">
                    <input className="grid-input-calender" type="date" />
                </div>
                <div className="grid-item grid-title-2 grid-row-2">종료일</div>
                <div className="grid-item grid-input-2 grid-row-2">
                    <input className="grid-input-calender" type="date" />
                </div>
                <div className="grid-item grid-title-1 grid-row-3">행사 도메인</div>
                <div className="grid-item grid-input-3 grid-row-3">
                    <input className="grid-input-box" type="text" />
                </div>
                <div className="grid-item grid-title-1 grid-row-4">기준 시간대</div>
                <div className="grid-item grid-input-1 grid-row-4 grid-fixed-text">
                    GMT +09 KOREA
                </div>
                <div className="grid-item grid-title-2 grid-row-4">사용 언어</div>
                <div className="grid-item grid-input-2 grid-row-4">
                    <form action="/">
                        <select className="grid-dropdown" name="languages" id="languages">
                            <option value="none">-select-</option>
                            <option value="english">영어</option>
                            <option value="japanese">일본어</option>
                            <option value="chinese">중국어</option>
                            <option value="korean">한국어</option>
                        </select>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default EventInfo;
