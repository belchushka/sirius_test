import React, {ChangeEventHandler, forwardRef} from 'react';
import s from './style.module.css'
import {IChip} from './types'

export const Chip = forwardRef<HTMLLabelElement,IChip>(({
    className,
    selected = false,
    onChange = ()=>null,
    children,
                                      }, ref) => {
  const handleChange: ChangeEventHandler<HTMLInputElement> = (event)=>{
    onChange(event.target.checked)
  }
  return (
      <label ref={ref} className={`${className || ''} ${s.chip} ${selected ? s.chip_selected : ''}`}>
        <input type="checkbox" checked={selected} onChange={handleChange}/>
        <p>{children}</p>
      </label>
  );
});
