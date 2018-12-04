import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockRenderer } from "./interfaces/renderer";

export const progressbar = (storyline: Tripetto.Storyline<IBlockRenderer>) => {
    return (
        <div className="col">
            <div className="progress">
                <div
                    className="progress-bar"
                    role="progressbar"
                    aria-valuenow={storyline.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    style={{ width: `${storyline.percentage}%`, minWidth: "2em" }}
                >
                    {storyline.percentage}%
                </div>
            </div>
        </div>
    );
};
