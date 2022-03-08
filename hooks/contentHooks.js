import awsS3 from "../utils/upload";
import util from "../utils/util";

// input 값 변경
export const onChange = (target, inputs, setInputs) => {
  const { type, name, value } = target;

  if (type === "checkbox") {
    const { checked } = target;

    setInputs({
      ...inputs,
      [name]: checked ? "Y" : "N",
    });
    return;
  }

  if (type === "file") {
    const { files } = target;

    setInputs({
      ...inputs,
      [name]: files[0],
    });
    return;
  }

  setInputs({
    ...inputs,
    [name]: value,
  });
};

// 이미지 버튼 변경 클릭
export const changeImg = (target, inputs, setInputs) => {
  const { name } = target;
  setInputs({
    ...inputs,
    [name]: "",
  });
};

// 데이터 가져오기
export const read = (inputs, setInputs, data, dataName) => {
  if (data?.[dataName]) {
    const inputData = data[dataName];

    console.log("inputData ::", inputData);

    setInputs({ ...inputs, ...inputData });
  }
};

// 새로 불러오기
export const refetchData = (refetch, dataName, inputs, setInputs) => {
  refetch().then((response) => {
    const list = response.data?.[dataName];

    setInputs({ ...inputs, ...list });
  });
};

// 저장 기능
export const contentSave = async (data, inputForm, contentName, code) => {
  let contentData = { ...data };

  const result = {};

  for (let i in inputForm) {
    const meta = inputForm[i];

    if (meta?.type === "int") {
      result[i] = parseInt(contentData[i], 10);
    } else if (meta?.type === "file") {
      if (typeof contentData[i] === "object") {
        const awsUrl = await awsS3(contentData[i], code, contentName, i);
        result[i] = awsUrl;
      } else {
        result[i] = contentData[i];
      }
    } else if (meta?.value) {
      result[i] = meta.value;
    } else {
      result[i] = contentData[i];
    }
  }

  return result;
};
