import React from 'react';
import { Droppable, DroppableProvided, DroppableStateSnapshot } from 'react-beautiful-dnd';

import { PearEntity, BasketEntity } from './types';
import Pear from './Pear';

interface IBasketProps {
  basket: BasketEntity;
  pears: PearEntity[];
}

const Basket: React.SFC<IBasketProps> = ({ basket, pears }) => {
  const { id, name } = basket;
  const pearsInThisBasket = pears.filter((pear) => pear.basket === id);
  return (
    <div className="basket-container">
      <h3 className="basket-label">{name} </h3>
      <Droppable droppableId={`droppable-basket-${id}`} type="PEAR">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            ref={provided.innerRef}
            style={{
              borderColor: snapshot.isDraggingOver ? '#f79d00' : '#7B5E3F',
            }}
            {...provided.droppableProps}
            className="basket"
          >
            {pearsInThisBasket &&
              pearsInThisBasket.map((pear, index) => (
                <Pear key={pear.name} name={pear.name} index={index} />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Basket;
