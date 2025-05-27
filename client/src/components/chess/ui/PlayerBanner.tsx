import logo from "../../../assets/logo.png";

type PlayerBannerProps = {
  username: string;
  avatar: string;
};

export default function PlayerBanner({ username }: PlayerBannerProps) {
  return (
    <div className="flex h-18 justify-start items-center gap-4 w-sm bg-inherit">
      <img className="w-12 h-12" src={logo} alt="avatar" />
      <p className="text-white font-bold">{username}</p>
    </div>
  );
}
