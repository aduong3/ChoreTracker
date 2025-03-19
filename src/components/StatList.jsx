import {
  MdOutlineDone,
  MdOutlineFormatListBulleted,
  MdOutlinePercent,
} from "react-icons/md";
import Stat from "../components/Stat";
import { IoHourglassOutline } from "react-icons/io5";

function StatList() {
  return (
    <>
      <Stat
        icon={<MdOutlineFormatListBulleted />}
        title="Total Chores"
        value={8}
        color="red"
      />
      <Stat
        icon={<IoHourglassOutline />}
        title="Remaining"
        value={5}
        color="green"
      />
      <Stat icon={<MdOutlineDone />} title="Completed" value={3} color="blue" />
      <Stat
        icon={<MdOutlinePercent />}
        title="Completed Rate"
        value="37.5%"
        color="purple"
      />
    </>
  );
}

export default StatList;
