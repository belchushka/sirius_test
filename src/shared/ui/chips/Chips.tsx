import React, {Children, ReactElement, useRef, useState} from 'react';
import s from './style.module.css'
import {IChips} from "./types";
import {Chip} from "./Chip";
import {Popover} from "@/shared/ui/popover";
import {useFold} from "@/shared/ui/chips/hooks";

export const Chips = ({
    children,
    className = ""
                                       }:IChips) => {
  const childrenArr = Children.toArray(children) as Array<ReactElement>;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const childrenRefs = useRef<Array<HTMLLabelElement>>([]);

  const [showPopOver, setShowPopOver] = useState(false);

  const togglePopover = ()=>setShowPopOver(state=>!state)

  const {overflowsFrom} = useFold({
    containerRef,
    childrenRefs,
    childrenLength: childrenArr.length
  })

  return (
      <div ref={containerRef} className={`${className} ${s.chips_container}`}>
        {childrenArr.slice(0, overflowsFrom).map((child,num)=>{
          return React.cloneElement(child, {
            ref: (ref: HTMLLabelElement)=>{
              childrenRefs.current[num] = ref
            },
            key: num,
          })
        })}
        {overflowsFrom !== childrenArr.length && <Popover width={300} opened={showPopOver} close={()=>setShowPopOver(false)}>
            <Popover.Target>
                <div onClick={togglePopover} className={s.show_more}>
                    <p>...</p>
                </div>
            </Popover.Target>
            <Popover.Dropdown>
                <div className={s.rest_chips_list}>
                  {childrenArr.slice(overflowsFrom).map((child, num)=>{
                    return React.cloneElement(child, {
                      key: num
                    })
                  })}
                </div>
            </Popover.Dropdown>
        </Popover>}
      </div>
  );
};

Chips.Chip = Chip
