import axios from "axios";

/**
 * 서버 API 요청용 공통 파일
 */
const api = axios.create({
  // baseURL: "http://www.pollock.kr",
  baseURL: "http://localhost:8080",
  withCredentials: true,
});

export default api;
