import React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

import { PearEntity } from './types';
import Pear from './Pear';

interface IPearTreeProps {
  pears: PearEntity[];
}

const PearTree: React.SFC<IPearTreeProps> = ({ pears }) => {
  const availablePears = pears.filter((pear) => !pear.basket);
  return (
    <Droppable droppableId="droppable-pear-tree" type="PEAR">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
        <div ref={provided.innerRef} {...provided.droppableProps} className="pear-tree">
          <h3>Available</h3>
          {availablePears.map((pear, index) => (
            <Pear key={pear.name} name={pear.name} index={index} />
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default PearTree;
