import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";

import api from "@/common/api";

import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";

const SignupPage = () => {
  const [nickname, setNickname] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSignup = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      await api.post("/api/pollock/public/users", {
        nickname,
      });
      navigate("/home");
    } catch (error) {
      console.error("fetchSignup", error);
      setError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCheckNickname = async (value: string) => {
    try {
      const response = await api.head(`/api/pollock/public/users/${value}`);

      if (response.status === 200) {
        setIsValid(false);
        setError("이미 존재하는 닉네임입니다.");
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        // 닉네임 없음 (사용 가능)
        setIsValid(true);
        setError("");
      } else {
        console.error("fetchCheckNickname", error);
        setIsValid(false);
        setError("닉네임 확인 중 오류가 발생했습니다.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setNickname(value);

    if (value.length === 0) {
      setIsValid(false);
      setError("");
      return;
    }

    if (value.length < 4 || value.length > 16) {
      setIsValid(false);
      setError("닉네임은 4자 이상 16자 이하로 입력해주세요.");
      return;
    }

    fetchCheckNickname(value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter" && isValid && !isLoading) {
      fetchSignup();
    }
  };

  const handleSubmit = () => {
    if (!isValid || isLoading) return;
    fetchSignup();
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="h-screen flex justify-center items-center px-8">
      <div className="w-full min-w-[320px] max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl">
        <div className="flex flex-col items-center gap-16">
          <div className="text-xl sm:text-2xl font-bold">
            닉네임을 설정해주세요
          </div>
          <div className="w-full text-black text-lg">
            <input
              type="text"
              value={nickname}
              placeholder="닉네임 입력"
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="py-2 text-center text-sm text-red-500">
              {error || <span className="text-transparent">에러 자리</span>}
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="w-full sm:w-72 fixed bottom-0 sm:static sm:my-16">
            <Button
              onClick={handleSubmit}
              text="확인"
              disabled={!isValid || isLoading}
              className={`w-full text-lg p-2 sm:rounded ${
                isValid
                  ? "bg-pollock700 hover:bg-pollock600"
                  : "bg-pollock400 cursor-not-allowed"
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
