import cherry from "./cherry.json";
import sa from "./sa.json";
import vmm from "./VictorMonoMac.json";

const LEGENDS = {
  cherry: cherry,
  sa: sa,
  vmm,
};

export default LEGENDS;

export const legendOptions = Object.keys(LEGENDS);
