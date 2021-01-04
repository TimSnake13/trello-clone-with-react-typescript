import React from "react";
import ReactDOM from "react-dom";
import Draggable from "react-draggable";

function handleStart() {
  console.log("Start");
}
function handleDrag() {
  console.log("Drag");
}
function handleStop() {
  console.log("Stop");
}

class DraggableItem extends React.Component {
  eventLogger = (e: MouseEvent, data: Object) => {
    console.log("Event: ", e);
    console.log("Data: ", data);
  };

  render() {
    return (
      <Draggable
        axis="y"
        handle=".handle"
        defaultPosition={{ x: 0, y: 0 }}
        grid={[25, 25]}
        scale={1}
        onStart={handleStart}
        onDrag={handleDrag}
        onStop={handleStop}
      >
        <div>
          <div className="handle">Drag from here</div>
          <div>This readme is really dragging on...</div>
        </div>
      </Draggable>
    );
  }
}

export default DraggableItem;
