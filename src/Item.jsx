/* eslint-disable react/prop-types */
// import React from "react";
import { Draggable } from "react-beautiful-dnd";

const Item = ({ item, index }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          ...provided.draggableProps.style,
          padding: "8px",
          margin: "0 0 8px 0",
          backgroundColor: "lightgrey",
          borderRadius: "4px",
        }}
      >
        {item.content}
      </div>
    )}
  </Draggable>
);

export default Item;
