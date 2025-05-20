import {
  FaBookOpen,
  FaChartLine,
  FaCrown,
  FaPuzzlePiece,
  FaRegNewspaper,
  FaSearch,
  FaShoppingCart,
  FaUserFriends,
  FaUsers,
} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";

import { useNavigate } from "react-router-dom";

import Button from "./Button";

const menu = [
  {
    label: "퍼즐",
    icon: <FaPuzzlePiece size={24} />,
    sub: [{ label: "퍼즐", icon: <FaPuzzlePiece />, path: "/puzzle" }],
  },
  {
    label: "학습",
    icon: <FaChartLine size={24} />,
    sub: [
      { label: "오프닝", icon: <FaBookOpen />, path: "/learn/opening" },
      { label: "분석", icon: <FaSearch />, path: "/learn/analysis" },
    ],
  },
  {
    label: "뉴스",
    icon: <FaRegNewspaper size={24} />,
    sub: [{ label: "뉴스", icon: <FaRegNewspaper />, path: "/news" }],
  },
  {
    label: "소셜",
    icon: <FaUsers size={24} />,
    sub: [{ label: "친구", icon: <FaUserFriends />, path: "/social/friends" }],
  },
  {
    label: "더보기",
    icon: <BsThreeDots size={24} />,
    sub: [
      { label: "랭킹", icon: <FaCrown />, path: "/ranking" },
      { label: "상점", icon: <FaShoppingCart />, path: "/store" },
    ],
  },
];

const SideMenu = () => {
  const navigate = useNavigate();

  return (
    <aside className="fixed top-0 left-0 h-screen w-48 bg-pollock850">
      {/* 로고 */}
      <div>
        <Button
          className="w-full text-3xl font-bold px-4 py-8"
          text="Pollock"
          onClick={() => (window.location.href = "/")}
        />
      </div>

      <div>
        {menu.map((item) => (
          <div key={item.label} className="group">
            {/* 메인 메뉴 */}
            <div className="p-4 hover:bg-pollock750 cursor-pointer">
              <div className="flex items-center gap-4">
                {item.icon}
                {item.label}
              </div>
            </div>

            {/* 서브 메뉴 */}
            <div className="hidden fixed top-0 left-48 h-screen w-48 group-hover:flex flex-col bg-pollock950">
              {item.sub.map((sub) => (
                <Button
                  key={sub.label}
                  className="w-full text-left p-4 hover:bg-pollock750"
                  onClick={() => navigate(sub.path)}
                >
                  <div className="flex items-center gap-4">
                    {sub.icon}
                    {sub.label}
                  </div>
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideMenu;
