import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export const LOGIN_COMPANY = gql`
  mutation loginUser($input: loginInput) {
    loginUser(input: $input) {
      name
      email
      token
    }
  }
`;

const LoginCompany = () => {
  const router = useRouter();
  const { query } = router;
  const { error } = query;

  const [form, setForm] = React.useState({
    email: "",
    password: "",
    role: ["admin", "company"],
  });

  const [loading, setLoading] = React.useState({ open: false });
  const [message, setMessage] = useState({ code: null, error });

  const [adminLogin] = useMutation(LOGIN_COMPANY, {
    onError: (err) => {
      console.log("error ::", err.message);
      setMessage({ error: err.message });
    },
    onCompleted: (data) => {
      const { loginUser } = data;

      // const pcoUser = {
      //   idx:loginUser.idx,
      //   pco_idx: loginUser.pco.idx,
      //   pco_name: loginUser.pco.name,
      //   name: loginUser.name,
      //   email: loginUser.email,
      //   active_yn: loginUser.active_yn,
      //   created_at: loginUser.created_at,
      //   role: "pco",
      // }

      sessionStorage.setItem("companyUser", JSON.stringify(loginUser));
      sessionStorage.setItem("companyToken", data.loginUser.token);
      location.href = "home";
    },
    // refetchQueries: [{ query: PCO_LIST_QUERY }],
  });

  // const [login, loginResult] = useMutation(LOGIN_ADMIN);

  // const loginData = loginResult.data?.login;

  const onChange = (e) => {
    const { id, value } = e.target;

    setForm({
      ...form,
      [id]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading({ loading: true });

    console.log("form ::", form);

    await adminLogin({ variables: { input: form } });

    return false;
  };
  return (
    <>
      <div className="loginWrap">
        <form className="login">
          <legend className="login__title">Log-In</legend>
          <p className="login__item">
            <label className="login__label" htmlFor="email">
              Email
            </label>
            <input
              className="login__input"
              // placeholder="Type your email..."
              type="email"
              id="email"
              onChange={(e) => onChange(e)}
              value={form.email}
            />
            {/* <input className="login__input" type="email" name="userID" id="userID" /> */}
          </p>
          <p className="login__item">
            <label className="login__label" htmlFor="password">
              P/W
            </label>
            {/* <input
            className="login__input"
            type="password"
            name="userPW"
            id="userPW"
          /> */}

            <input
              className="login__input"
              type="password"
              id="password"
              onChange={(e) => onChange(e)}
              value={form.password}
            />
          </p>
          {message.error && <p className="login__errorMsg">{message.error}</p>}
          <p className="login__submit">
            <input
              className="login__submitBtn"
              type="submit"
              value="Log In"
              onClick={onSubmit}
            />
          </p>
        </form>
      </div>
    </>
  );
};

export default LoginCompany;
