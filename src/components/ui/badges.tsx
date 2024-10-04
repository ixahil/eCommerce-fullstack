import React from "react";
import { Badge } from "@/components/ui/badge";

type Props = {
  items: string[];
};

const Badges = (props: Props) => {
  return (
    <div className="space-x-2">
      {props.items.map((item) => (
        <Badge variant={"outline"} key={item}>
          {item}
        </Badge>
      ))}
    </div>
  );
};

export default Badges;
