import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockHelper } from "./helper";

export interface IBlockRenderer extends Tripetto.NodeBlock {
    render: (h: IBlockHelper) => React.ReactNode;
}
