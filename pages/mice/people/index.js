import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import PeopleList from "../../../components/people/PeopleList";
import AttendeesNormal from "../../../components/odc/AttendeesNormal";
import AttendeesSpeaker from "../../../components/odc/AttendeesSpeaker";
import Modal_1 from "../../../components/odc/Modal_1";
import Modal_2 from "../../../components/odc/Modal_2";
const changeDisplay = (btn) => {
    if (btn == "participant") {
        document.getElementById("participantSection").style.display = "block"
        document.getElementById("speakerSection").style.display = "none"
        document.getElementById("participantBtn").style.backgroundColor = "#e1e0ff"
        document.getElementById("speakerBtn").style.backgroundColor = ""
    } else {
        document.getElementById("participantSection").style.display = "none"
        document.getElementById("speakerSection").style.display = "block"
        document.getElementById("participantBtn").style.backgroundColor = ""
        document.getElementById("speakerBtn").style.backgroundColor = "#e1e0ff"
    }

}

const PeopleListPage = (props) => {
    const router = "Invited Speaker";
    const title = "INVITED SPEAKER";
    const [modalVisible, setModalVisible] = useState(false)
    const [mode, setMode] = useState("participant");

    const openModal = () => {
        setModalVisible(true)
    }

    const closeModal = () => {
        setModalVisible(false)
    }
    return (
        <>
            <PcoDocHeader title={title} />
            <div className="wrap">
                <PcoHeader />
                <PcoNavbar />
                <div className="contents">
                    <div className="contents__wrap">
                        <div style={{ display: "flex", position: "relative" }}>
                            <li className={"people_btn"}
                                style={{ marginRight: "20px", backgroundColor: "#e1e0ff" }}
                                id={"participantBtn"}
                                onClick={() =>{
                                    setMode("participant");
                                    changeDisplay("participant");
                                }}
                            >참가자</li>

                            <li className={"people_btn"}
                                id={"speakerBtn"}
                                onClick={() => {
                                    setMode("speaker");
                                    changeDisplay("speaker");
                                }}
                                >스피커</li>

                            <li className={"people_btn"}
                                style={{ position: "absolute", top: "0", right: "0", color: "blue" }}
                                id={"speakerBtn"}
                                onClick={openModal}>추가하기</li>
                        </div>

                        <div style={{ display: "block" }}
                            id={"participantSection"}>
                            <AttendeesNormal></AttendeesNormal>
                        </div>

                        <div style={{ display: "none" }}
                            id={"speakerSection"}>
                            <AttendeesSpeaker></AttendeesSpeaker>
                        </div>
                        {mode === "participant" ? (
                            <Modal_1 modalVisible={modalVisible} closeModal={closeModal} />
                        ) : <Modal_2 modalVisible={modalVisible} closeModal={closeModal} />}
                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default React.memo(PeopleListPage);
