import api from "./axios";

export const getDiaryByDate = async (date) => {
  const { data } = await api.get(`/diary/${date}`);
  return data;
};

export const createDiaryByDate = async (date, payload) => {
  const { data } = await api.post(`/diary/${date}`, payload);
  return data;
};

export const updateDiaryByDate = async (date, payload) => {
  const { data } = await api.put(`/diary/${date}`, payload);
  return data;
};
