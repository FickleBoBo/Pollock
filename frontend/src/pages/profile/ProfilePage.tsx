import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { FaCrown, FaGem, FaUser } from "react-icons/fa";

import { UserInfo, useUserStore } from "@/store/userStore";
import { UserSimpleInfo } from "@/types/user";

import api from "@/common/api";

const ProfilePage = () => {
  const { nickname } = useParams();

  const myInfo = useUserStore((state) => state.userInfo);
  const [userInfo, setUserInfo] = useState<UserInfo | UserSimpleInfo | null>(
    null
  );

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await api.get<UserSimpleInfo>(
          `/api/pollock/public/users/${nickname}`
        );
        setUserInfo(data);
      } catch (error) {
        console.error("fetchUserInfo", error);
      }
    };

    if (myInfo?.nickname !== nickname) {
      fetchUserInfo();
    } else {
      setUserInfo(myInfo);
    }
  }, [nickname, myInfo]);

  return (
    <div>
      <div className="flex gap-8 p-16">
        <div className="flex-1 flex gap-4 p-4 bg-pollock800">
          <div className="w-64 h-64">
            <img
              src={userInfo?.profileImageUrl}
              alt="profile"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div className="flex gap-2">
              <div className="text-3xl font-bold">
                {userInfo &&
                  `${userInfo.title !== "NONE" ? `[${userInfo.title}] ` : ""}${
                    userInfo.nickname
                  }`}
              </div>
              <div className="flex items-center">
                {userInfo?.role === "BASIC" && <FaUser size={24} />}
                {userInfo?.role === "PREMIUM" && <FaGem size={24} />}
                {userInfo?.role === "ADMIN" && <FaCrown size={24} />}
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <div>
                {userInfo && "email" in userInfo && (
                  <div className="flex gap-2">
                    <div>이메일</div>
                    <div>{userInfo.email}</div>
                  </div>
                )}
              </div>

              <div>
                {userInfo &&
                  "birthyear" &&
                  "birthmonth" &&
                  "birthday" in userInfo && (
                    <div className="flex gap-2">
                      <div>{userInfo.birthyear}년</div>
                      <div>{userInfo.birthmonth}월</div>
                      <div>{userInfo.birthday}일</div>
                    </div>
                  )}
              </div>

              <div>
                {userInfo && "gender" in userInfo && (
                  <div className="flex gap-2">
                    <div>성별</div>
                    <div>{userInfo.gender}</div>
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <div className="flex gap-2">
                  <div>팔로잉</div>
                  <div>{userInfo?.followingCount}</div>
                </div>
                <div className="flex gap-2">
                  <div>팔로워</div>
                  <div>{userInfo?.followersCount}</div>
                </div>
              </div>

              <div className="flex gap-2">
                <div>가입일</div>
                <div>{userInfo?.createdAt}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-16 p-4 font-bold bg-pollock800">
          <div className="flex flex-col justify-between">
            <div>BULLET</div>
            <div>BLITZ</div>
            <div>RAPID</div>
            <div>CLASSICAL</div>
            <div>PUZZLE</div>
          </div>
          <div className="flex flex-col justify-between">
            <div>{userInfo?.bulletElo}</div>
            <div>{userInfo?.blitzElo}</div>
            <div>{userInfo?.rapidElo}</div>
            <div>{userInfo?.classicalElo}</div>
            <div>{userInfo?.puzzleElo}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
