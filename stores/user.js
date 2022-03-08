import { makeVar } from "@apollo/client";

const userVar = makeVar({});

export const loginUser = (content) => {
  // const currentUser = userVar();
  const newUser = { ...content };
  userVar(newUser);
};

export default userVar;
