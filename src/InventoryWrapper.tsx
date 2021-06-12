import React from 'react';
import "./App.css";
import { useNuiService } from './hooks/useNuiService';
import { useNuiListenerService } from './hooks/useNuiListenerService';
import { useIsMenuVisible } from "./state/visibility.state";
import InventoryRoot from "./components/InventoryRoot";

setTimeout(() => {
  window.dispatchEvent(
    new MessageEvent("message", {
      data: {
        app: 'inventory',
          method: 'setPrimaryContainer',
          data: {
            slots: 35,
            type: "player",
            maxCapacity: 50,
            maxWeight: 100,
            currentCapacity: 0,
            currentWeight: 0,
            inventory: {
              5: {
                slotType: "normal",
                itemType: "food",
                label: "Burger",
                amount: 4,
                weight: 0.1,
                usable: true,
                metadata: {}
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
    <div className="App" style={styled}>
      <InventoryRoot />
    </div>
  );

};

export default InventoryWrapper;