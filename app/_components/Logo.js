import { HiMiniChartBar } from "react-icons/hi2";

function Logo({ textSize, iconSize, className }) {
  return (
    <p
      className={`flex items-center justify-center ${textSize} font-bold text-emerald-700 ${className}`}
    >
      <HiMiniChartBar size={iconSize} />
      FXTrade
    </p>
  );
}

export default Logo;
