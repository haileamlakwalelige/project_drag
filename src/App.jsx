import { useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Box from "./Box";
import Item from "./Item";

const initialData = {
  boxes: {
    "box-1": {
      id: "box-1",
      title: "Box 1",
      items: ["item-1", "item-2", "item-3"],
    },
    "box-2": {
      id: "box-2",
      title: "Box 2",
      items: ["item-4", "item-5", "item-6"],
    },
    "box-3": {
      id: "box-3",
      title: "Box 3",
      items: ["item-7", "item-8", "item-9"],
    },
    "box-4": {
      id: "box-4",
      title: "Box 4",
      items: ["item-10", "item-11", "item-12"],
    },
  },
  items: {
    "item-1": { id: "item-1", content: "Item 1" },
    "item-2": { id: "item-2", content: "Item 2" },
    "item-3": { id: "item-3", content: "Item 3" },
    "item-4": { id: "item-4", content: "Item 4" },
    "item-5": { id: "item-5", content: "Item 5" },
    "item-6": { id: "item-6", content: "Item 6" },
    "item-7": { id: "item-7", content: "Item 7" },
    "item-8": { id: "item-8", content: "Item 8" },
    "item-9": { id: "item-9", content: "Item 9" },
    "item-10": { id: "item-10", content: "Item 10" },
    "item-11": { id: "item-11", content: "Item 11" },
    "item-12": { id: "item-12", content: "Item 12" },
  },
  order: ["box-1", "box-2", "box-3", "box-4"],
};

const App = () => {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startBox = data.boxes[source.droppableId];
    const endBox = data.boxes[destination.droppableId];

    if (startBox === endBox) {
      const newItemIds = Array.from(startBox.items);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newBox = {
        ...startBox,
        items: newItemIds,
      };

      const newData = {
        ...data,
        boxes: {
          ...data.boxes,
          [newBox.id]: newBox,
        },
      };

      setData(newData);
      return;
    }

    const startItemIds = Array.from(startBox.items);
    startItemIds.splice(source.index, 1);

    const newStartBox = {
      ...startBox,
      items: startItemIds,
    };

    const endItemIds = Array.from(endBox.items);
    endItemIds.splice(destination.index, 0, draggableId);

    const newEndBox = {
      ...endBox,
      items: endItemIds,
    };

    const newData = {
      ...data,
      boxes: {
        ...data.boxes,
        [newStartBox.id]: newStartBox,
        [newEndBox.id]: newEndBox,
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          padding: "20px",
        }}
      >
        {data.order.map((boxId) => {
          const box = data.boxes[boxId];
          return (
            <Droppable key={box.id} droppableId={box.id}>
              {(provided) => (
                <Box
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  title={box.title}
                >
                  {box.items.map((itemId, index) => {
                    const item = data.items[itemId];
                    return <Item key={item.id} item={item} index={index} />;
                  })}
                  {provided.placeholder}
                </Box>
              )}
            </Droppable>
          );
        })}
      </div>
    </DragDropContext>
  );
};

export default App;
