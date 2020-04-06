import React, { useCallback, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import { PearEntity, BasketEntity } from './types';
import Button from './Button';
import PearTree from './PearTree';
import Basket from './Basket';
import reorderList from '../utils/reorderList';

const noop = () => {};

const baskets = [
  { id: '1', name: 'One', teamId: '12345' },
  { id: '2', name: 'Two', teamId: '12345' },
  { id: '3', name: 'Three', teamId: '12345' },
  { id: '0', name: 'Out of Office', teamId: '12345' },
];

const Main: React.SFC = () => {
  const defaults = [
    {
      id: 'Daniel',
      name: 'Daniel',
      basket: null,
    },
    {
      id: 'James',
      name: 'James',
      basket: null,
    },
    {
      id: 'Laney',
      name: 'Laney',
      basket: null,
    },
    {
      id: 'Larry',
      name: 'Larry',
      basket: null,
    },
    {
      id: 'Phil',
      name: 'Phil',
      basket: '0',
    },
  ];
  const [pears, setPears] = useState<PearEntity[] | []>(defaults);

  const onDragEnd = useCallback(
    (event) => {
      const { draggableId, source, destination } = event;
      console.log('event :', event);
      if (
        source.droppableId === 'droppable-pear-tree' &&
        destination.droppableId === 'droppable-pear-tree'
      ) {
        setPears(reorderList(pears, source.index, destination.index));
      } else if (
        source.droppableId !== 'droppable-pear-tree' &&
        destination.droppableId === 'droppable-pear-tree'
      ) {
        const draggableName = draggableId.split('-')[1];
        const newPears = (pears as (PearEntity | any)[]).map((pear: PearEntity) => {
          if (pear.name === draggableName) {
            return {
              ...pear,
              basket: null,
            };
          }
          return pear;
        });
        setPears(newPears);
      } else if (destination.droppableId !== 'droppable-pear-tree') {
        const destinationBasketId = destination.droppableId.split('-')[2];
        const draggableName = draggableId.split('-')[1];
        const newPears = (pears as (PearEntity | any)[]).map((pear: PearEntity) => {
          if (pear.name === draggableName) {
            return {
              ...pear,
              basket: destinationBasketId,
            };
          }
          return pear;
        });
        setPears(newPears);
      }
    },
    [pears]
  );

  const disableSubmit = pears.some((pear: PearEntity) => !pear.basket);

  return (
    <DragDropContext
      onBeforeCapture={noop}
      onBeforeDragStart={noop}
      onDragStart={noop}
      onDragUpdate={noop}
      onDragEnd={onDragEnd}
    >
      <main className="main">
        <PearTree pears={pears} />
        <section className="content">
          <div className="options">
            <Button id="reset-pairs-btn" onClick={noop}>
              Reset
            </Button>
            <Button id="randomize-pairs-btn" onClick={noop}>
              Suggest
            </Button>
            <Button id="confirm-pairs-btn" onClick={noop} disabled={disableSubmit}>
              Confirm
            </Button>
          </div>
          <div className="baskets">
            {baskets.map((basket: BasketEntity) => (
              <Basket key={`basket-${basket.id}`} basket={basket} pears={pears} />
            ))}
          </div>
        </section>
      </main>
    </DragDropContext>
  );
};

export default Main;
