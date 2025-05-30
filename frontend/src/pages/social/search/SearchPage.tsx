import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FiSearch } from "react-icons/fi";

import { UserSimpleInfo } from "@/types/user";
import { Page } from "@/types/pagination";

import api from "@/common/api";

import Button from "@/components/common/Button";
import LoadingSpinner from "@/components/common/LoadingSpinner";
import UserCard from "@/components/social/UserCard";

const size = 30;

const SearchPage = () => {
  const [keyword, setKeyword] = useState(""); // 검색창 키워드
  const [searchKeyword, setSearchKeyword] = useState(""); // 실제 검색 키워드

  const [userPage, setUserPage] = useState<Page<UserSimpleInfo> | null>(null);
  const [page, setPage] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const fetchSearchUsers = async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const { data } = await api.get<Page<UserSimpleInfo>>(
        "/api/pollock/users/search",
        {
          params: { keyword: searchKeyword, page, size },
        }
      );
      setUserPage(data);
    } catch (error) {
      console.error("유저 목록 조회 실패:", error);
      setUserPage(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = () => {
    if (!keyword.trim()) {
      setKeyword("");
      setSearchKeyword("");
      setUserPage(null);
      setPage(0);
      return;
    }

    setPage(0);
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    if (searchKeyword) {
      fetchSearchUsers();
    }
  }, [searchKeyword, page]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col gap-16 p-16">
        {/* 검색창 */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-pollock400" />
          <input
            type="text"
            placeholder="검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="w-full pl-12 pr-8 py-2 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>

        {/* 검색 결과 */}
        <div className="grid grid-cols-3 gap-8 w-fit mx-auto">
          {userPage &&
            userPage.content.map((user) => (
              <Button onClick={() => navigate(`/profile/${user.nickname}`)}>
                <UserCard user={user} />
              </Button>
            ))}
        </div>
      </div>

      <div className="mx-auto text-black">
        {/* 검색 결과 없음 */}
        {!isLoading && userPage?.content.length === 0 && (
          <div className="text-center text-pollock500">
            검색 결과가 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
