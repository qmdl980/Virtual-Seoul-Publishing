import util from "../utils/util";
import { eventInput } from "./eventInfoRead";

export const eventInfoSave = (inputs) => {
  const input = inputs;

  if (util.isEmpty(input.language)) {
    window.alert("언어를 선택해 주세요");
    return "err";
  }
  if (util.isEmpty(input.type)) {
    window.alert("참가자 등록을 선택해 주세요");
    return "err";
  }

  if (input?.language === "KOR") input.language = ["kr"];
  if (input?.language === "ENG") input.language = ["en"];
  if (input?.language === "KOR+ENG") input.language = ["kr", "en"];

  let formData = {};

  Object.keys(eventInput).map((key, index) => {
    const meta = eventInput[key];
    if (meta.type && meta.type === "int") {
      formData[key] = parseInt(input[key], 10);
    } else {
      formData[key] = input[key];
    }
  });

  return formData;
};
