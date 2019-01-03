import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { IBlockRenderer } from "./interfaces/renderer";

export const buttons = (storyline: Tripetto.Storyline<IBlockRenderer>) => {
    return (
        <div className="col-md-auto">
            <div role="group" aria-label="Navigation">
                {storyline.mode === "progressive" ? (
                    <button type="button" className="btn btn-success" disabled={!storyline.isFinishable} onClick={() => storyline.finish()}>
                        Complete
                    </button>
                ) : (
                    <>
                        {!storyline.isAtStart && (
                            <button
                                type="button"
                                className="btn btn-light mr-2"
                                disabled={storyline.isAtStart}
                                onClick={() => storyline.stepBackward()}
                            >
                                Back
                            </button>
                        )}
                        <button
                            type="button"
                            className={storyline.isAtFinish ? "btn btn-success" : "btn btn-primary"}
                            disabled={storyline.isFailed || (storyline.isAtFinish && !storyline.isFinishable)}
                            onClick={() => storyline.stepForward()}
                        >
                            {storyline.isAtFinish ? "Complete" : "Next"}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
