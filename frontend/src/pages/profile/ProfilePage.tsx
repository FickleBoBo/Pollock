import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { nickname } = useParams<{ nickname: string }>();

  return <div>{nickname} 프로필 페이지</div>;
};

export default ProfilePage;
