import {ReactElement, ReactNode} from "react";

export interface IWithClass {
  className?: string;
}

export interface IWithChildren {
  children: ReactNode | ReactElement;
}
