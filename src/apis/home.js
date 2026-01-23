import api from "./axios";

export const getHome = async () => {
  const email = localStorage.getItem("userEmail");

  const { data } = await api.get("/Home", {
    params: { email: email }
  });

  return data;
};
