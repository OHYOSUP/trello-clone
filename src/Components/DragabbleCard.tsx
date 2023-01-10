import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>
    props.isDragging ? "#0984e3" : props.theme.bgColor};
  box-shadow: ${(props) =>
    props.isDragging ? "0px,2px, 25px, rgba(0,0,0,0.05)" : "none"};
`;

interface IDraggableCardProps {
  toDoId: number;
  toDoText: string
  index: number;
}
function DragabbleCard({ toDoId, toDoText ,index }: IDraggableCardProps) {
  return (
    <Draggable draggableId={toDoId+""} index={index}>
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);