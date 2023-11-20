import {useState} from "react";

export default function Draggable({children, ...rest}) {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({x: 0, y: 0});
  const [offset, setOffset] = useState({x: 0, y: 0});

  // Common function to start dragging
  const startDragging = (clientX, clientY) => {
    setOffset({
      x: clientX - position.x,
      y: clientY - position.y,
    });
    setIsDragging(true);
  };

  // Handle mouse down and touch start
  function handleStart(e) {
    const clientX = e.type === "mousedown" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousedown" ? e.clientY : e.touches[0].clientY;
    startDragging(clientX, clientY);
  }

  // Handle mouse move and touch move
  function handleMove(e) {
    if (!isDragging) return;
    const clientX = e.type === "mousemove" ? e.clientX : e.touches[0].clientX;
    const clientY = e.type === "mousemove" ? e.clientY : e.touches[0].clientY;
    setPosition({
      x: clientX - offset.x,
      y: clientY - offset.y,
    });
  }

  // Common function to stop dragging
  function handleStop() {
    setIsDragging(false);
  }

  return (
    <div
      onMouseDown={handleStart}
      onTouchStart={handleStart}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseUp={handleStop}
      onTouchEnd={handleStop}
      onMouseLeave={handleStop} // Optional: Stop dragging when mouse leaves the element
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
