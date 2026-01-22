import api from "./axios";

export const getHome = async () => {
  const { data } = await api.get("/Home");
  return data;
};
