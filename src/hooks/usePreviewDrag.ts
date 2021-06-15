import { useRef } from 'react';
import { useStyles } from '../components/Slot/Item';
import { IItem } from '../state/container.state';


export const usePreviewDrag = () => {

  const previewRef = useRef<HTMLDivElement | null>(null);
  const classes = useStyles();


  const createPreview = (item:IItem, width:number, height: number) => {
    const preview = document.createElement('div');
    preview.style.width = width + 'px';
    preview.style.height = height + 'px';
    preview.style.position = 'absolute';

    if (item.amount > 0) {
      const itemInfo = document.createElement('div');
      itemInfo.classList.add(classes.itemInfo);

      const itemAmount = document.createElement('div');
      itemAmount.classList.add(classes.itemAmount);

      itemAmount.appendChild(document.createTextNode(`${item.amount}`));
      itemInfo.appendChild(itemAmount);

      const itemWeight = document.createElement('div');
      itemWeight.classList.add(classes.itemWeight);
      const stackedAmount = item.weight * item.amount
      const toFixedAmount = Math.round(stackedAmount*100)/100;
      itemWeight.appendChild(document.createTextNode(`${toFixedAmount}`));
      itemInfo.appendChild(itemWeight);
      preview.appendChild(itemInfo);
    }


    const itemImage = document.createElement('IMG');
    itemImage.classList.add(classes.itemImage);
    itemImage.setAttribute('src', `images/${item.label}.png`);
    itemImage.setAttribute('alt', 'Item');
    preview.appendChild(itemImage);

    const itemLabel = document.createElement('div');
    itemLabel.classList.add(classes.itemLabel);
    itemLabel.appendChild(document.createTextNode(`${item.label}`));
    preview.appendChild(itemLabel);

    previewRef.current = preview;
    //console.log(preview);
    document.body.appendChild(preview);
    return preview;
  };

  const removePreview = () => {
    if (previewRef.current === null) {
      throw Error("PreviewRef was not previously created.");
    }
    document.body.removeChild(previewRef.current);
    previewRef.current = null
  };



  return {createPreview, removePreview};


}
