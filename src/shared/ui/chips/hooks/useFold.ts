import {useLayoutEffect, useState} from "react";
import React from "react";

type Params = {
  containerRef: React.MutableRefObject<HTMLElement | null>,
  childrenRefs: React.MutableRefObject<Array<HTMLElement>>,
  childrenLength: number
}
export const useFold = ({
                          containerRef,
                          childrenRefs,
                          childrenLength
                        }: Params) => {
  const [overflowsFrom, setOverflowsFrom] = useState(childrenLength)
  const [showPopOver, setShowPopOver] = useState(false);

  const togglePopover = ()=>setShowPopOver(state=>!state)

  useLayoutEffect(() => {
    const childrenWidths = childrenRefs.current.map(el => el?.getBoundingClientRect()?.width || 0)
    const observerCallback = () => {
      setShowPopOver(false)
      if (containerRef.current) {
        const containerWidth = containerRef.current.getBoundingClientRect().width
        let total = 60;
        for (let i = 0; i < childrenWidths.length; i++) {
          const currentWidth = childrenWidths[i]
          if (!currentWidth) {
            continue
          }

          const newTotal = total + currentWidth + 10;
          if (newTotal > containerWidth) {
            setOverflowsFrom(i)
            return
          }

          total = newTotal
        }
        setOverflowsFrom(childrenLength)
      }
    }
    const observer = new ResizeObserver(observerCallback)
    if (containerRef.current) {
      observer.observe(containerRef.current)
    }
    return () => observer.disconnect()
  }, [])

  return {
    overflowsFrom,
    togglePopover,
    setShowPopOver,
    showPopOver
  }
}
