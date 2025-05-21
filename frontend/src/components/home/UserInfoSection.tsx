import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { HiChevronUp, HiChevronDown } from "react-icons/hi";

import { UserInfo } from "../../constant/User";

import Button from "../common/Button";

interface UserInfoSectionProps {
  userInfo: UserInfo;
}

const UserInfoSection = ({ userInfo }: UserInfoSectionProps) => {
  const [isOpenBulletElo, setIsOpenBulletElo] = useState(false);
  const [isOpenBlitzElo, setIsOpenBlitzElo] = useState(false);
  const [isOpenClassicalElo, setIsOpenClassicalElo] = useState(false);
  const [isOpenPuzzleElo, setIsOpenPuzzleElo] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-2 font-bold">
      <div>
        <Button
          onClick={() => navigate("/profile")}
          className="w-full flex items-center gap-4 p-4"
        >
          <div className="w-10 h-10">
            <img
              src={userInfo.profileImageUrl}
              alt="profile"
              className="w-full h-full rounded-xl object-cover"
            />
          </div>
          <div>{userInfo.nickname}</div>
          <div>{userInfo.grade}</div>
        </Button>
      </div>
      <div className="flex flex-col">
        <div>
          <Button
            onClick={() => setIsOpenBulletElo(!isOpenBulletElo)}
            className="w-full p-4"
          >
            <div className="flex justify-between">
              <div>Elo Bullet</div>
              <div className="flex gap-1">
                <div>{userInfo.bulletElo}</div>
                <div>
                  {isOpenBulletElo ? (
                    <HiChevronUp size={24} />
                  ) : (
                    <HiChevronDown size={24} />
                  )}
                </div>
              </div>
            </div>
          </Button>
        </div>
        <div>
          {isOpenBulletElo && (
            <div>
              <img
                src="/test.jpg"
                className="w-full h-auto cursor-pointer"
                onClick={() => setIsOpenBulletElo(!isOpenBulletElo)}
              />
            </div>
          )}
        </div>
        <div>
          <Button
            onClick={() => setIsOpenBlitzElo(!isOpenBlitzElo)}
            className="w-full p-4"
          >
            <div className="flex justify-between">
              <div>Elo Blitz</div>
              <div className="flex gap-1">
                <div>{userInfo.blitzElo}</div>
                <div>
                  {isOpenBlitzElo ? (
                    <HiChevronUp size={24} />
                  ) : (
                    <HiChevronDown size={24} />
                  )}
                </div>
              </div>
            </div>
          </Button>
        </div>
        <div>
          {isOpenBlitzElo && (
            <div>
              <img
                src="/test.jpg"
                className="w-full h-auto cursor-pointer"
                onClick={() => setIsOpenBlitzElo(!isOpenBlitzElo)}
              />
            </div>
          )}
        </div>
        <div>
          <Button
            onClick={() => setIsOpenClassicalElo(!isOpenClassicalElo)}
            className="w-full p-4"
          >
            <div className="flex justify-between">
              <div>Elo Classical</div>
              <div className="flex gap-1">
                <div>{userInfo.classicalElo}</div>
                <div>
                  {isOpenClassicalElo ? (
                    <HiChevronUp size={24} />
                  ) : (
                    <HiChevronDown size={24} />
                  )}
                </div>
              </div>
            </div>
          </Button>
        </div>
        <div>
          {isOpenClassicalElo && (
            <div>
              <img
                src="/test.jpg"
                className="w-full h-auto cursor-pointer"
                onClick={() => setIsOpenClassicalElo(!isOpenClassicalElo)}
              />
            </div>
          )}
        </div>
        <div>
          <Button
            onClick={() => setIsOpenPuzzleElo(!isOpenPuzzleElo)}
            className="w-full p-4"
          >
            <div className="flex justify-between">
              <div>Elo Puzzle</div>
              <div className="flex gap-1">
                <div>{userInfo.puzzleElo}</div>
                <div>
                  {isOpenPuzzleElo ? (
                    <HiChevronUp size={24} />
                  ) : (
                    <HiChevronDown size={24} />
                  )}
                </div>
              </div>
            </div>
          </Button>
        </div>
        <div>
          {isOpenPuzzleElo && (
            <div>
              <img
                src="/test.jpg"
                className="w-full h-auto cursor-pointer"
                onClick={() => setIsOpenPuzzleElo(!isOpenPuzzleElo)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfoSection;
