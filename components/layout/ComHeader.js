import React, { useEffect, useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import util from "../../utils/util";
import { useRouter } from "next/router";

export const ME_QUERY = gql`
  query {
    companyMe {
      idx
      user_idx
      booth_class_idx
      booth_exhibition
      company_name
      ceo_name
      address
      map_url
      mobile_no
      logo_url
      website_url
      sort_order
      user {
        name
      }
    }
  }
`;

const PcoHeader = () => {
  const { loading, error, data, refetch } = useQuery(ME_QUERY, {});
  const router = useRouter();
  const pathname = router.pathname;

  const logout = (e) => {
    location.href = "/company/logout";
  };

  const [user, setUser] = useState({});
  useEffect(() => {
    // const t = JSON.parse(sessionStorage.getItem("miceUser"));
    // setUser(t);
  }, []);

  const _read = async (prop) => {
    const hasError = util.hasGQLError(error);
    if (hasError) return;

    console.log("data ::", data);
    console.log("pathname ::", pathname);
    setUser(data?.companyMe);
  };

  useEffect(() => {
    if (loading === false) _read();
  }, [loading]);

  return (
    <>
      <div className="header">
        <div className="header__logo">
          <img src="/assets/cms/vspe_logo.png" alt="logo" />
        </div>
        <h1 className="header__title">{user?.company_name || ""}</h1>
        <div className="header__userInfo">
          <p
            className="header__userName"
            style={{ cursor: "pointer" }}
            onClick={(e) => {
              location.href = "/pco/myInfo";
            }}
          >
            {user && user?.user?.name}
          </p>
          <button className="header__logout" onClick={logout}>
            log-out
          </button>
        </div>
      </div>
    </>
  );
};

export default PcoHeader;
