import { SimpleTreeItemWrapper, SortableTree } from "dnd-kit-sortable-tree";
import React from "react";

export const MinimalViable = ({ data, setData }) => {
  return (
    <SortableTree
      items={data}
      onItemsChanged={setData}
      TreeItemComponent={MinimalTreeItemComponent}
    />
  );
};

/*
 * Here's the component that will render a single row of your tree
 */
export const MinimalTreeItemComponent = React.forwardRef((props, ref) => {
  return (
    /* you could also use FolderTreeItemWrapper if you want to show vertical lines.  */
    <SimpleTreeItemWrapper {...props} ref={ref} className="">
      <div className="w-full">
        <p>{props.item.label}</p>
      </div>
    </SimpleTreeItemWrapper>
  );
});

MinimalTreeItemComponent.displayName = "MinimalTreeItemComponent";

/*
 * Configure the tree data.
 */
// const initialViableMinimalData = [
//   {
//     id: "1",
//     value: "Jane",
//     children: [
//       { id: "4", value: "John" },
//       { id: "5", value: "Sally" },
//     ],
//   },
//   { id: "2", value: "Fred", children: [{ id: "6", value: "Eugene" }] },
//   { id: "3", value: "Helen", canHaveChildren: false },
// ];
