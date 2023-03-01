import {IWithClass} from "@types";
import React,{ReactElement} from "react";


export interface IChips extends IWithClass {
  children: Array<ReactElement> | ReactElement
}
export interface IChip extends IWithClass {
  children: string,
  selected?: boolean
  onChange?: (val: boolean)=>void
}
