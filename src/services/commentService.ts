// src/services/commentService.ts
import axios from "axios";

const API_URL = "http://15.235.185.142:5004/api/comments";

export const fetchComments = async (postId: string, page = 1) => {
  const res = await axios.get(`${API_URL}/${postId}?page=${page}`);
  return res.data;
};

export const postComment = async (postId: string, content: string, token: string) => {
  const res = await axios.post(
    API_URL,
    { postId, content },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return res.data;
};

export const deleteComment = async (id: string, token: string) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};
