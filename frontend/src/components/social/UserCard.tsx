import { UserSimpleInfo } from "@/types/user";

interface UserCardProps {
  user: UserSimpleInfo;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <div className="h-64 aspect-[1.618/1] flex gap-4 p-4 border rounded">
      <div>
        <img
          src={user.profileImageUrl}
          alt={user.nickname}
          className="w-full h-full rounded object-cover"
        />
      </div>
      <div className="flex-1 flex flex-col gap-4">
        <div className="font-bold">
          {user.title !== "NONE"
            ? `[${user.title}] ${user.nickname}`
            : user.nickname}
        </div>
        <div className="h-full flex justify-between text-sm text-pollock500">
          <div className="flex flex-col justify-between">
            <div>Following</div>
            <div>Followers</div>
            <div>Bullet</div>
            <div>Blitz</div>
            <div>Puzzle</div>
            <div>Classical</div>
            <div>Role</div>
          </div>
          <div className="flex flex-col justify-between items-end">
            <div>{user.followingCount}</div>
            <div>{user.followersCount}</div>
            <div>{user.bulletElo}</div>
            <div>{user.blitzElo}</div>
            <div>{user.classicalElo}</div>
            <div>{user.puzzleElo}</div>
            <div>{user.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
