import React, { useState } from "react";
import util from "../../utils/util";
import styled from "styled-components";
// import awsS3 from "../../utils/ncloud-s3";
// import { useS3Upload } from "next-s3-upload";
import awsS3 from "../../utils/upload";
import { useReactiveVar } from "@apollo/client";
import userVar from "../../stores/user";

const ContentContainer = styled.div`
  text-align: center;
  margin-top: 350px;

  .resultContiner {
    width: 100%;
    height: 400px;
  }

  .resultBox {
    display: inline-block;
  }

  .resultBox + .resultBox {
    margin-left: 40px;
  }

  h1 {
    text-align: center;
    font-size: 30px;
  }
  iframe {
    width: 622px;
    height: 350px;
  }

  .inputContiner {
    margin-top: 50px;
  }

  button {
    margin-left: 10px;
    border: 1px solid black;
    padding: 5px;
  }

  input {
    width: 700px;
    height: 20px;
    margin-left: 10px;
    border: 1px solid black;
  }
`;

const Url = () => {
  // let { FileInput, openFileDialog, uploadToS3 } = useS3Upload();
  const { event } = useReactiveVar(userVar);
  const [form, setForm] = useState({
    idx: 12,
    background_img: "",
    left_logo: "",
    right_logo: "",
    message: "message",
  });

  const [detailImageFile, setDetailImageFile] = useState();

  const onUpload = async () => {
    const input = { ...form };
    console.log("input ::", input);
    const file = input.background_img;

    console.log("event ::", event.code);

    const testUrl = await awsS3(file, event.code, "loading", "background_img");

    console.log("testUrl ::", testUrl);

    // let { url } = await uploadToS3(test);

    // console.log("url ::", url);
  };

  return (
    <ContentContainer>
      <div className="resultContiner">
        <div style={{ marginTop: "30px" }}>
          <label>IMAGE URL</label>
          <input
            type="file"
            name="background_img"
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.files[0],
              });
            }}
          />
          <input
            type="file"
            name="left_logo"
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.files[0],
              });
            }}
          />
          <input
            type="file"
            name="right_logo"
            onChange={(e) => {
              setForm({
                ...form,
                [e.target.name]: e.target.files[0],
              });
            }}
          />
          <button onClick={onUpload}>업로드</button>
        </div>
      </div>
      {/* {console.log("detailImageFile ::", detailImageFile)}
      {detailImageFile && (
        <div className="image_area">
          <img src={detailImageFile} />
        </div>
      )} */}
    </ContentContainer>
  );
};

export default Url;
