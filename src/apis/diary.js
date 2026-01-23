import api from "./axios";

export const getDiaryByDate = async (date) => {
  const email = localStorage.getItem("userEmail");

  const { data } = await api.get(`/diary/${date}`, {
    params: { email: email }
  });
  return data;
};

export const createDiaryByDate = async (date, payload) => {
  const email = localStorage.getItem("userEmail");

  const { data } = await api.post(`/diary/${date}`, {
    ...payload,
    email: email
  });
  return data;
};

export const updateDiaryByDate = async (date, payload) => {
  const email = localStorage.getItem("userEmail");

  const { data } = await api.put(`/diary/${date}`, {
    ...payload,
    email: email
  });
  return data;
};