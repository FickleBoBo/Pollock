import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "pollock.kr", // 로컬 도메인 (hosts에 등록한 것)
    port: 5173, // Vite 기본 포트
    cors: true, // 개발용 CORS 허용
    origin: "http://pollock.kr:5173", // 명시적으로 origin 지정
  },
});
