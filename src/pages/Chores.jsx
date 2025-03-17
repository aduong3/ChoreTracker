import { MdOutlineFormatListBulleted, MdOutlinePercent } from "react-icons/md";
import Stat from "../components/Stat";
import { IoHourglassOutline } from "react-icons/io5";
import { GiFinishLine } from "react-icons/gi";
import ChoresList from "../components/ChoresList";

function Chores() {
  return (
    <>
      <div className="grid grid-cols-4 gap-x-12 gap-y-4 py-4">
        <h1 className="col-span-full text-3xl text-zinc-800">Chores</h1>
        <Stat
          icon={<MdOutlineFormatListBulleted />}
          title="Total Chores"
          value="8"
          color="red"
        />
        <Stat
          icon={<IoHourglassOutline />}
          title="Remaining"
          value="5"
          color="green"
        />
        <Stat
          icon={<GiFinishLine />}
          title="Completed"
          value="3"
          color="blue"
        />
        <Stat
          icon={<MdOutlinePercent />}
          title="Completed Rate"
          value="37.5%"
          color="purple"
        />
      </div>
      <ChoresList />
    </>
  );
}

export default Chores;
