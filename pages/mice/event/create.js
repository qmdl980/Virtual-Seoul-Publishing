import { gql, useMutation } from "@apollo/client";
import { useRouter } from "next/router";
import React, { useRef, useState } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import EventCreate from "../../../components/odc/EventCreate";

export const CREATE_EVENT = gql`
  mutation createEvent($input: eventInput) {
    createEvent(input: $input) {
      idx
      title
      code
      start_date
      end_date
      domain
      language
      type
      privacy_consent
      user_consent
      time_zone
      created_at
    }
  }
`;

export const inputForm = {
  title: { type: "required" },
  code: { type: "required" },
  start_date: { type: "required" },
  end_date: { type: "required" },
  domain: { type: "required" },
  language: { type: "required" },
  type: { type: "required" },
  privacy_consent: "",
  user_consent: "",
};

const EventListPage = (props) => {
  const router = useRouter();
  const { query } = router;
  const { error } = query;
  const [inputs, setInputs] = useState({});
  const privacyRef = useRef();
  const userRef = useRef();
  const [message, setMessage] = useState({ code: null, error });

  const [mutationCreate] = useMutation(CREATE_EVENT, {
    onError: (err) => {
      console.log("mutationCreate error!", err);
      setMessage({ error: err.message });
    },
    onCompleted: (data) => {
      location.href = "/mice/event";
    },
  });

  const onChange = ({ target }) => {
    let { value, name } = target;

    if (name === "code")
      value = value.replace(/[^A-Z0-9-_]/gi, "").toUpperCase();

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const _seve = async () => {
    const input = inputs;
    if (input?.language === "KOR") input.language = ["kr"];
    if (input?.language === "ENG") input.language = ["en"];
    if (input?.language === "KOR+ENG") input.language = ["kr", "en"];

    if (privacyRef.current.getInstance().getHTML())
      input.privacy_consent = privacyRef.current.getInstance().getHTML();
    if (userRef.current.getInstance().getHTML())
      input.user_consent = userRef.current.getInstance().getHTML();

    mutationCreate({ variables: { input } });
  };

  return (
    <>
      <PcoDocHeader title={"EVENT"} />
      <div className="wrap">
        <PcoHeader />
        <div className="contents">
          <div className="contents__wrap">
            <EventCreate
              inputs={inputs}
              onChange={onChange}
              privacyRef={privacyRef}
              userRef={userRef}
            ></EventCreate>
            {message?.error && (
              <p className="login__errorMsg" style={{ marginLeft: "50%" }}>
                {message.error}
              </p>
            )}
            <button
              id={"create_btn"}
              className={"create-btn"}
              onClick={_seve}
              style={{ marginLeft: "50%" }}
            >
              이벤트 생성
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(EventListPage);
