import React, { useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';

interface IPearProps {
  name: string;
  index: number;
}

const Pear: React.SFC<IPearProps> = ({ name, index }) => {
  const randomNumber = useMemo(() => Math.floor(Math.random() * 5) + 1, []);
  return (
    <Draggable draggableId={`draggable-${name}`} index={index}>
      {(provided: any, snapshot: any) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="pear"
        >
          <img src={`./assets/pear${randomNumber}.png`} className="pear-icon" alt={name} />
          {name}
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Pear;
