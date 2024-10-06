import React from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  // items: string[];
  items: string;
};

const Badges = (props: Props) => {
  return (
    <div className="space-x-2">
      {/* {props.items.map((item) => (
        <Badge variant={"outline"} key={item}>
          {item}
        </Badge>
      ))} */}
      <Badge variant={"outline"}>{props.items}</Badge>
    </div>
  );
};

export default Badges;
