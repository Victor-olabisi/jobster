export const addUserLocalStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

export const removerUserLocalStorage = () => {
  localStorage.removeItem("user");
};

export const getUserFromLocalStorage = () => {
  // const result = localStorage.getItem("user");
  //   let user = null;
  //   if (!result === null) {
  //     user = JSON.parse(result);
  //     return user;
  //   }
  // return user;
  const user = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null;
  return user;

};
