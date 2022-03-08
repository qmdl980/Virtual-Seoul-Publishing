import { makeVar } from "@apollo/client";

const listTableVar = makeVar({});
const detailTableVar = makeVar({});

export const listTable = (content) => {
  const newData = { ...content };
  listTableVar(newData);
};

export const detailTable = (content) => {
  const newData = { ...content };
  detailTableVar(newData);
};

export { listTableVar, detailTableVar };
