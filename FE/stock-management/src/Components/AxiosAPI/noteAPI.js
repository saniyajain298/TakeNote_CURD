import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getNoteDetailsList = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/getNotesList`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getNoteDetail = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/viewNote/${id}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const createNoteDetails = async (data) => {
  try {
    const response = await axios
      .post(`${BASE_URL}/createNote`, data)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (error) {
    throw error;
  }
};

export const updateNoteDetails = async (data, id) => {
  try {
    console.log("done1", data)
    const response = await axios
      .patch(`${BASE_URL}/updateNote/${id}`, data)
      .then((res) => {
        console.log("done", res.data)
        return res.data;

      });
    return response;
  } catch (error) {
    throw error;
  }
};

export const deleteNoteDetails = async (id) => {
  try {
    const response = await axios
      .delete(`${BASE_URL}/deleteNote/${id}`)
      .then((res) => {
        return res.data;
      });
    return response;
  } catch (error) {
    throw error;
  }
};
