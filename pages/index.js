import React, { useEffect, useState } from "react";
import Head from "next/head";
import { gql, useLazyQuery, useQuery } from "@apollo/client";
import io from "socket.io-client";

const GET_NOTICE = gql`
  query ($idx: Int!, $offset: Int) {
    event(idx: $idx) {
      noticePaging(offset: $offset) {
        totalCount
        limit
        offset
        noticeList {
          idx
          title
          contents
          created_at
        }
      }
    }
  }
`;

const IndexPage = (e) => {
  const [notice, setNotice] = useState([]);
  const [getNotice, { loading, data, error }] = useLazyQuery(GET_NOTICE, {
    onCompleted: (data) => {
      setNotice(data.event.noticePaging.noticeList);
    },
  });

  const handleClick = () => {
    getNotice({ variables: { idx: 1 } });
  };

  const connectServer = () => {
    console.log("connectServer !!");
    const namespace = "31d0639b44e940fe9fd34c3ac9c93d4b"; // event domain 으로 묶음.
    const token = "token~~";
    const options = {
      auth: {
        token,
      },
      transports: ["websocket"],
    };
    // socket에서 token 의 유효성을 한번 더 검사해서 disconnect 시킴.
    const socket = io("/" + namespace, options); // client Id 끼리 묶음. 행사 도메인.

    socket.on("connect", () => {
      console.log("socket connected ::", socket.id);
      // console.log(socket.connected); // true

      const payload = { aa: "bb" }; // 이 payload 가 서버를 통해 payload.body로 전달됨.
      // payload.userId = myId; //"";
      // payload.userName = myName; //"";
      // payload.messageId =
      //   Date.now().toString() + "_" + Math.floor(Math.random() * 100000 + 1);
      // payload.message = `${myName}님이 입장하였습니다.`;
      socket.emit("join", payload);
      socket.emit("message", payload);
    });
    socket.on("auth", (payload) => {
      console.log("auth event fired.", payload);
    });
    socket.on("message", (payload) => {
      console.log("on message ::", payload);
    });

    socket.on("disconnect", (payload) => {
      console.log("disconnect from server.", payload);
    });
  };

  return (
    <>
      <Head>
        <title>VSPE</title>
        <link rel="stylesheet" href="/stylesheets/style.css" />
      </Head>

      <div className="index">VSPE</div>
      <button type="button" onClick={handleClick}>
        DB Test
      </button>
      <ul>
        {notice &&
          notice.map((item, index) => {
            return <li key={index}>{item.title}</li>;
          })}
      </ul>
      <button type="button" onClick={connectServer}>
        Websocket
      </button>
    </>
  );
};

export default IndexPage;
