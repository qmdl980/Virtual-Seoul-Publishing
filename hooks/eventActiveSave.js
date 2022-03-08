export const eventActiveInput = {
  idx: { type: "int" },
  conference_active: "",
  workshop_active: "",
  exhibition_active: "",
  open_stage_active: "",
  theater_active: "",
  seoul_booth_active: "",
  lounge_active: "",
  business_room_active: "",
};

export const eventActiveSave = (inputs) => {
  const input = inputs;

  let formData = {};

  Object.keys(eventActiveInput).map((key, index) => {
    const meta = eventActiveInput[key];
    if (meta.type && meta.type === "int") {
      formData[key] = parseInt(input[key], 10);
    } else {
      formData[key] = input[key];
    }
  });

  return formData;
};
