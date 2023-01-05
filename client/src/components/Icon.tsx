interface IconProps {
  styles?: string;
  name?: string;
  imgUrl: string;
  activePage?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

function Icon(props: IconProps) {
  const { styles, name, imgUrl, activePage, disabled, handleClick } = props;
  return (
    <div
      className={`w-[48px] h-[48px] rounded-[10px] ${
        activePage && activePage === name && "bg-[#2c2f32]"
      } flex justify-center items-center ${
        !disabled && "cursor-pointer"
      } ${styles}`}
      onClick={handleClick}
    >
      {!activePage ? (
        <img src={imgUrl} alt="fund_logo" className="w-1/2 h-1/2" />
      ) : (
        <img
          src={imgUrl}
          alt="fund_logo"
          className={`w-1/2 h-1/2 ${activePage !== name && "grayscale"}`}
        />
      )}
    </div>
  );
}

export default Icon;
