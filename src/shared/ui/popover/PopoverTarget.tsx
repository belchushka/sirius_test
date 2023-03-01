import React, { useContext } from 'react';
import { PopoverContext } from '@/shared/ui/popover/PopoverContext';
import { IPopoverTarget } from '@/shared/ui/popover/types';

const PopoverTarget: React.FC<IPopoverTarget> = ({
  children
}) => {
  const context = useContext(PopoverContext);
  if (context == null) {
    return null;
  }
  const { floating } = context;
  return (
    React.cloneElement(children, {
      ref: floating.refs.setReference,
    })
  );
};

export {
  PopoverTarget
};
