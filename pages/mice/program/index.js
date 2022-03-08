import React, {useState, useEffect, useMemo} from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import {
    onChange,
    changeImg,
    read,
    refetchData,
    contentSave,
} from "../../../hooks/contentHooks";
import {useMutation, useQuery, useReactiveVar} from "@apollo/client";
import userVar from "../../../stores/user";
import util from "../../../utils/util";
import PRBoothKioskTable from "../../../components/platformContents/PRBoothKioskTable";
import TitleForm from "../../../components/odc/TitleForm";


const PRBoothPage = (props) => {
    const dataName = "ProgramSet";

    const [inputs, setInputs] = useState({});
    const {event} = useReactiveVar(userVar);

    const [type, setType] = useState("Schedule");


    // 타입 버튼 클릭
    const onClickBtn = ({target}) => {
        const {name} = target;
        setType(name);
        //_refetchData();
    };

    // input 변경 이벤트
    const _onChange = ({target}) => onChange(target, inputs, setInputs);
    // 이미지 버튼 변경 클릭
    const _changeImg = ({target}) => changeImg(target, inputs, setInputs);
    // 데이터 가져오기
    const _read = () => read(inputs, setInputs, data, dataName);
    // 새로 불러오기
    //const _refetchData = () => refetchData(refetch, dataName, inputs, setInputs);

    // 저장
    const _contentSave = async () => {
        /*const code = event?.code;

        let inputForm;

        if (type === "Banner") inputForm = bannerInput;
        if (type === "Video") inputForm = videoInput;
        if (type === "Kiosk") inputForm = kioskInput;

        if (util.isEmpty(inputForm)) {
            console.log("error: type error");
            return;
        }

        const input = await contentSave(inputs, inputForm, "exhibition", code);

        const result = await mutationUpDate({ variables: { input: input } });*/
    };


    return (
        <>
            <PcoDocHeader title={"title"}/>
            <div className="wrap">
                <PcoHeader/>
                <PcoNavbar/>
                <div className="contents">
                    <div className="contents__wrap">
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <button
                                className={"create-btn"}
                                style={{
                                    marginRight: "1vw",
                                    backgroundColor: type === "Schedule" && "#635dff",
                                    color: type === "Schedule" && "white",
                                }}
                                onClick={onClickBtn}
                                name="Schedule"
                                id={"scheduleBtn"}
                            >
                                Schedule
                            </button>
                            <button
                                className={"create-btn"}
                                style={{
                                    marginRight: "1vw",
                                    backgroundColor: type === "Session" && "#635dff",
                                    color: type === "Session" && "white",
                                }}
                                onClick={onClickBtn}
                                name="Session"
                                id={"sessionBtn"}
                            >
                                Session
                            </button>
                            <button
                                className={"create-btn"}
                                style={{
                                    marginRight: "1vw",
                                    backgroundColor: type === "Presentation" && "#635dff",
                                    color: type === "Presentation" && "white",
                                }}
                                onClick={onClickBtn}
                                name="Presentation"
                                id={"presentationBtn"}
                            >
                                Presentation
                            </button>
                            <button
                                className={"create-btn"}
                                style={{
                                    marginRight: "1vw",
                                    backgroundColor: type === "FinalCheck" && "#635dff",
                                    color: type === "FinalCheck" && "white",
                                }}
                                onClick={onClickBtn}
                                name="FinalCheck"
                                id={"finalCheckBtn"}
                            >
                                Final Check
                            </button>
                        </div>

                        <div id={"scheduleSection"}
                             style={{display: type === "Schedule" ? "block" : "none"}}>

                            <TitleForm title="스케줄 관리">
                                {" "}
                            </TitleForm>
                        </div>

                        <div id={"sessionSection"}
                             style={{display: type === "Session" ? "block" : "none"}}>

                            <TitleForm title="세션 관리">
                                {" "}
                            </TitleForm>
                        </div>

                        <div id={"presentationSection"}
                             style={{display: type === "Presentation" ? "block" : "none"}}>

                            <TitleForm title="발표 일정 관리">
                                {" "}
                            </TitleForm>
                        </div>

                        <div id={"finalCheckSection"}
                             style={{display: type === "FinalCheck" ? "block" : "none"}}>

                            <TitleForm title="마무리 확인">
                                {" "}
                            </TitleForm>

                            <PRBoothKioskTable
                                inputs={inputs}
                                _onChange={_onChange}
                                _contentSave={_contentSave}
                                _changeImg={_changeImg}
                            />
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(PRBoothPage);