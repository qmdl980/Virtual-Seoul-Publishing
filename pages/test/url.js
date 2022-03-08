import React, { useState } from "react";
import util from "../../utils/util";
import styled from "styled-components";
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
  const [imageUrl, setImageUrl] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const onBtnClick = async (type) => {
    if (type === "img") {
      const { imgUrl } = await util.urlChange(imageUrl);
      if (!util.isEmpty(imgUrl)) setImageUrl(imgUrl);
    } else if (type === "vod") {
      const { vodUrl } = await util.urlChange(videoUrl);
      if (!util.isEmpty(vodUrl)) setVideoUrl(vodUrl);
    }
  };

  return (
    <ContentContainer>
      <div className="resultContiner">
        {imageUrl && (
          <div className="resultBox">
            <h1>IMAGE</h1>
            <img src={imageUrl} />
          </div>
        )}
        {videoUrl && (
          <div className="resultBox">
            <h1>VIDEO</h1>
            <iframe
              src={videoUrl}
              allow="camera; microphone; autoplay; fullscreen"
            ></iframe>
          </div>
        )}
      </div>
      <div className="inputContiner">
        <div>
          <label>VIDEO URL</label>
          <input
            type="url"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
            }}
          />
          <button onClick={() => onBtnClick("vod")}>자동완성</button>
        </div>
        <div style={{ marginTop: "30px" }}>
          <label>IMAGE URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => {
              setImageUrl(e.target.value);
            }}
          />
          <button onClick={() => onBtnClick("img")}>자동완성</button>
        </div>
      </div>
    </ContentContainer>
  );
};

export default Url;
