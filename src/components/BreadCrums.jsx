import { useLocation } from "react-router-dom";

const BreadCrums = () => {
  const { pathname } = useLocation();
  const paths = pathname
    .split("/")
    .filter((item) => item !== "")
    .filter((item) => isNaN(item)) // সংখ্যা বাদ
    .map(
      (item) => item.charAt(0).toUpperCase() + item.slice(1) // customer -> C + ustomer
    );

  return ["Home", ...paths].join(" / ");
};

export default BreadCrums;