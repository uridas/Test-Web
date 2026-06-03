import React, { useState } from 'react';
import { Button, Panel, TextArea, Typography } from 'components';

const initialItems = [
  { id: 'salmon-avocado', name: 'Salmon Avocado Roll', price: 4, count: 0, note: '' },
  { id: 'california-roll', name: 'California Roll', price: 4, count: 0, note: '' },
  { id: 'spam-musubi', name: 'Spam Musubi', price: 4, count: 0, note: '' },
  { id: 'nigiri', name: 'Nigiri', price: 4, count: 0, note: '' },
  { id: 'chicken-katsu', name: 'Chicken Katsu', price: 4, count: 0, note: '' },
];

const OrderTaker = () => {
  const [items, setItems] = useState(initialItems);

  const updateCount = (id: string, delta: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(0, item.count + delta) }
          : item,
      ),
    );
  };

  const updateNote = (id: string, note: string) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, note } : item,
      ),
    );
  };

  const total = items.reduce((sum, item) => sum + item.count * item.price, 0);

  return (
    <Panel width="420px">
      <Typography as="h2" variant="title" margin="0 0 16px 0">
        Order Taker
      </Typography>

      {items.map((item) => (
        <div key={item.id} style={{ marginBottom: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <Typography as="h3">{item.name}</Typography>
            <Typography as="span">${item.price}</Typography>
          </div>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
            <Button onClick={() => updateCount(item.id, -1)}>-</Button>
            <Typography as="span">{item.count}</Typography>
            <Button onClick={() => updateCount(item.id, 1)}>+</Button>
          </div>

          <div style={{ marginTop: '12px' }}>
            <Typography weight="600" margin="0 0 6px 0">
              Notes for this item
            </Typography>
            <TextArea
              value={item.note}
              onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) =>
                updateNote(item.id, event.target.value)
              }
              placeholder="Add a note for this dish"
            />
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: '16px',
          paddingTop: '16px',
          borderTop: '1px solid rgba(0,0,0,0.1)',
        }}
      >
        <Typography as="h3" margin="0 0 8px 0">
          Total
        </Typography>
        <Typography as="p" weight="700">
          ${total.toFixed(2)}
        </Typography>
      </div>
    </Panel>
  );
};

export default OrderTaker;
