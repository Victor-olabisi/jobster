import { IoBarChartSharp } from "react-icons/io5";
import { MdQueryStats } from "react-icons/md";
import { FaWpforms } from "react-icons/fa";
import { ImProfile } from "react-icons/im";

const links = [
  {
    id: 1,
    path: "/",
    text: "stat",
    // icon: <ToBarChartSharp />,
  },
  {
    id: 2,
    path: "all-jobs",
    text: "all-jobs",
    icon: <MdQueryStats />,
  },
  {
    id: 3,
    path: "add-jobs",
    text: "add-jobs",
    icon: <FaWpforms />,
  },
  {
    id: 4,
    path: "profile",
    text: "profile",
    icon: <ImProfile />,
  },
];

export default links 