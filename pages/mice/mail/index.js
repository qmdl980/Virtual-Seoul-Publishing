import React, { useState, useEffect, useMemo } from "react";
import PcoDocHeader from "../../../components/layout/PcoDocHeader";
import PcoHeader from "../../../components/layout/PcoHeader";
import PcoNavbar from "../../../components/layout/PcoNavbar";
import MailForm from "../../../components/odc/MailForm";
import { gql, useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { contentSave } from "../../../hooks/contentHooks";
import userVar from "../../../stores/user";

export const EVENT_EMAIL_QUERY = gql`
  query {
    eventEmail {
      idx
      title
      content
      type
    }
  }
`;

export const UPDATE_EVENT_MAIL_SET = gql`
  mutation updateEventEmail($input: eventEmailInput) {
    updateEventEmail(input: $input) {
      idx
      title
      content
      type
    }
  }
`;

export const inputForm = {
  idx: { type: "int" },
  title: "",
  content: "",
  type: "",
};

const MailPage = (props) => {
  const router = "user";
  const title = "USER";

  const [inputs, setInputs] = useState();

  const { loading, error, data, refetch } = useQuery(EVENT_EMAIL_QUERY, {
    variables: {},
  });

  // 업데이트 api
  const [mutationUpDate] = useMutation(UPDATE_EVENT_MAIL_SET, {
    onError: (error) => {
      console.log("mutationUpDate error!", error);
    },
    onCompleted: (data) => {
      window.alert("수정이 완료 되었습니다.");
    },
  });

  const onChange = ({ target }) => {
    const { id, name, value } = target;

    setInputs({
      ...inputs,
      [id]: {
        ...inputs[id],
        [name]: value,
      },
    });
  };

  // 데이터 가져오기
  const _read = async (prop) => {
    if (data?.eventEmail) {
      const eventEmail = data.eventEmail;
      const userEmail = eventEmail.filter(({ type }) => type === "user")?.[0];
      const companyEmail = eventEmail.filter(
        ({ type }) => type === "company"
      )?.[0];
      const resetEmail = eventEmail.filter(({ type }) => type === "reset")?.[0];

      setInputs({
        user: {
          ...userEmail,
        },
        company: {
          ...companyEmail,
        },
        reset: {
          ...resetEmail,
        },
      });
      // console.log("eventEmail ::", eventEmail);

      // setInputs({ ...inputs, ...eventEmail });
    }
  };

  // 저장
  const _contentSave = async ({ target }) => {
    const { name } = target;

    const input = await contentSave(inputs?.[name], inputForm);
    console.log("input ::", input);
    mutationUpDate({ variables: { input } });
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  if (loading || !inputs) return <></>;

  return (
    <>
      <PcoDocHeader title={title} />
      <div className="wrap">
        <PcoHeader />
        <PcoNavbar />
        <div className="contents">
          <div className="contents__wrap">
            <MailForm
              inputs={inputs}
              onChange={onChange}
              _contentSave={_contentSave}
            ></MailForm>
          </div>
        </div>
      </div>
    </>
  );
};

export default React.memo(MailPage);
