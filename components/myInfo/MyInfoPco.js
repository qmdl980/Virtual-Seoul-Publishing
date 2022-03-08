import React, { useState } from "react";
import ReactMoment from "react-moment";
import "moment-timezone";
import util from "../../utils/util";
import styled from "styled-components";
import { gql, useQuery, useMutation } from "@apollo/client";

const MyInfoContainer = styled.div`
  & input {
    width: 70%;
    height: 25px;
    border: 1px solid #e0e0e0;
  }
  & th {
    color: #000;
    width: 20%;
  }
  & button {
    background-color: rgb(9, 81, 114);
    color: #fff;
    width: 90px;
    height: 40px;
    border-radius: 5px;
  }
`;

export const CHANGE_PCO_USER_PASSWORD = gql`
  mutation changePcoUserPassword($input: changePcoUserPasswordInput) {
    changePcoUserPassword(input: $input) {
      idx
      name
    }
  }
`;

const MyInfoPco = (props) => {
  const [changePcoUserPasswordQL] = useMutation(CHANGE_PCO_USER_PASSWORD, {
    onError: (error) => {
      const hasError = util.hasGQLError(error);
    },
    onCompleted: (data) => {
      setForm({
        current_password: "",
        new_password1: "",
        new_password2: "",
      });
      window.alert("변경되었습니다.");
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });

  const [form, setForm] = useState({
    current_password: "",
    new_password1: "",
    new_password2: "",
  });

  const changePcoUserPassword = (e) => {
    changePcoUserPasswordQL({ variables: { input: form } });
  };

  return (
    <MyInfoContainer>
      <table className="table">
        <tbody className="not_col_tbody">
          <tr>
            <th>현재 비빌번호</th>
            <td>
              <input
                type="password"
                name="current_password"
                required
                value={form["current_password"]}
                onChange={(e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <th>신규 비빌번호</th>
            <td>
              <input
                type="password"
                name="new_password1"
                required
                value={form["new_password1"]}
                onChange={(e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <th>신규 비빌번호 확인</th>
            <td>
              <input
                type="password"
                name="new_password2"
                required
                value={form["new_password2"]}
                onChange={(e) => {
                  setForm({
                    ...form,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </td>
          </tr>
          <tr>
            <td
              colSpan={2}
              style={{
                textAlign: "center",
              }}
            >
              <button type="button" onClick={changePcoUserPassword}>
                저장
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </MyInfoContainer>
  );
};

export default React.memo(MyInfoPco);
