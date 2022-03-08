import React, { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/router";

export const LOGIN_ADMIN = gql`
  mutation loginAdmin($input: loginInput) {
    loginAdmin(input: $input) {
      idx
      token
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const { query } = router;
  const { error } = query;

  const [form, setForm] = React.useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = React.useState({ open: false });
  const [message, setMessage] = useState({ code: null, error });

  const [adminLogin] = useMutation(LOGIN_ADMIN, {
    onError: (err) => {
      console.log("error ::", err.message);
      setMessage({ error: err.message });
    },
    onCompleted: (data) => {
      console.log("data ::", data);
      sessionStorage.setItem("adminToken", data.loginAdmin.token);
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

export default Login;
