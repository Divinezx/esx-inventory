import React from 'react';
import "./App.css";
import { useNuiService } from './hooks/useNuiService';
import { useNuiListenerService } from './hooks/useNuiListenerService';
import { useIsMenuVisible } from "./state/visibility.state";
import InventoryRoot from "./components/InventoryRoot";
import ContextMenu from './components/ContextMenu/ContextMenu';
import { DialogProvider } from './providers/DialogProvider';
import { DndContext } from '@dnd-kit/core';

setTimeout(() => {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: {
        app: 'inventory',
          method: 'setPrimaryContainer',
          data: {
            id: "12312312",
            slots: 35,
            type: "player",
            maxCapacity: 50,
            maxWeight: 100,
            currentCapacity: 0,
            currentWeight: 0,
            inventory: {
              8: {
                slotType: "normal",
                itemType: "id",
                label: "ID Card",
                amount: 1,
                weight: 0.1,
                usable: true,
                metadata: {
                  description: "Your ID Card.",
                  serial_number: "123-123-123",
                  name: "John Doe"
                }
              },
              5: {
                slotType: "normal",
                itemType: "food",
                label: "Burger",
                amount: 4,
                weight: 0.1,
                usable: true,
                metadata: {
                  description: "A cheeseburger."
                }
              },
              6: {
                slotType: "normal",
                itemType: "food",
                label: "Burger",
                amount: 4,
                weight: 0.1,
                usable: true,
                metadata: {
                  description: "A cheeseburger."
                }
              }
            }
          }
      },
    })
  );
}, 500);

setTimeout(() => {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: {
        app: 'inventory',
          method: 'setSecondaryContainer',
          data: {
            id: "111111",
            slots: 5,
            type: "trunk",
            maxCapacity: 55,
            maxWeight: 150,
            currentCapacity: 0,
            currentWeight: 0
          }
      },
    })
  );
}, 500);


setTimeout(() => {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: {
        app: 'inventory',
          method: 'setVisibility',
          data: true
      },
    })
  );
}, 1000);

const InventoryWrapper: React.FC = () => {
  const visible = useIsMenuVisible();

  useNuiService();
  useNuiListenerService();

  const styled = visible ? { height: '100vh', opacity: 1 } : undefined;

  return (
    <DialogProvider>
      <DndContext>
        <div className="App" style={styled}>
          <InventoryRoot />
          <ContextMenu />
        </div>
      </DndContext>
    </DialogProvider>
  );

};

export default InventoryWrapper;
