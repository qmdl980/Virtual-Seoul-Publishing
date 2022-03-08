export const eventInput = {
  idx: { type: "int" },
  title: "",
  code: "",
  start_date: "",
  end_date: "",
  domain: "",
  language: "",
  type: "",
  privacy_consent: "",
  user_consent: "",
};

export const eventInfoRead = (event) => {
  let eventData = {};

  if (event?.language.length > 1) {
    eventData = {
      ...event,
      ["language"]: "KOR+ENG",
    };
  } else if (event?.languag?.[0] === "kr") {
    eventData = {
      ...event,
      ["language"]: "KOR",
    };
  } else if (event?.languag?.[0] === "en") {
    eventData = {
      ...event,
      ["language"]: "ENG",
    };
  } else {
    eventData = {
      ...event,
    };
  }

  const result = {};

  Object.keys(eventInput).map((key, index) => {
    const meta = eventInput[key];
    if (meta.type && meta.type === "int") {
      result[key] = parseInt(eventData[key], 10);
    } else {
      result[key] = eventData[key];
    }
  });

  return result;
};
