import * as React from "react";
import { Collector } from "../collector";
import { Blocks } from "../collector/blocks/blocks";

export const settingsModal = (collector: Collector, blocks: Blocks) => (
    <div className="modal" id="settingsModal" role="dialog" aria-labelledby="settingsModalTitle" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header px-4">
                    <h5 className="modal-title" id="settingsModalTitle">
                        Settings
                    </h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body px-4">
                    <h6>Mode</h6>
                    <div className="form-group">
                        <div className="custom-control custom-radio mb-3">
                            <input
                                type="radio"
                                id="paginated"
                                name="mode"
                                defaultChecked={blocks.mode === "paginated"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (blocks.mode = "paginated")}
                                className="custom-control-input"
                                aria-describedby="paginated_explanation"
                            />
                            <label htmlFor="paginated" className="custom-control-label">
                                Paginated
                                <small className="form-text text-secondary" id="paginated_explanation">
                                    {
                                        // tslint:disable-next-line:max-line-length
                                        "Blocks are presented page for page and the user navigates through the pages using the next and back buttons."
                                    }
                                </small>
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                type="radio"
                                id="continuous"
                                name="mode"
                                defaultChecked={blocks.mode === "continuous"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (blocks.mode = "continuous")}
                                className="custom-control-input"
                                aria-describedby="continuous_explanation"
                            />
                            <label htmlFor="continuous" className="custom-control-label">
                                Continuous
                                <small className="form-text text-secondary" id="continuous_explanation">
                                    {
                                        // tslint:disable-next-line:max-line-length
                                        "This will keep all past blocks in view as the user navigates using the next and back buttons."
                                    }
                                </small>
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                type="radio"
                                id="progressive"
                                name="mode"
                                defaultChecked={blocks.mode === "progressive"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (blocks.mode = "progressive")}
                                className="custom-control-input"
                                aria-describedby="progressive_explanation"
                            />
                            <label htmlFor="progressive" className="custom-control-label">
                                Progressive
                                <small className="form-text text-secondary" id="progressive_explanation">
                                    {
                                        // tslint:disable-next-line:max-line-length
                                        "In this mode all possible blocks are presented to the user. The user does not need to navigate using the next and back buttons (so we can hide those buttons)."
                                    }
                                </small>
                            </label>
                        </div>
                        <hr />
                        <h6>Display</h6>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="numerators"
                                    type="checkbox"
                                    defaultChecked={collector.settings.numerators}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        collector.changeSettings({
                                            numerators: e.target.checked
                                        })
                                    }
                                    className="custom-control-input"
                                    aria-describedby="numerators_explanation"
                                />
                                <label htmlFor="numerators" className="custom-control-label">
                                    Numerators
                                    <small className="form-text text-secondary" id="numerators_explanation">
                                        Shows numbers in labels.
                                    </small>
                                </label>
                            </div>
                        </div>
                        {blocks.mode === "paginated" && (
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="pages"
                                        type="checkbox"
                                        defaultChecked={collector.settings.pages}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            collector.changeSettings({
                                                pages: e.target.checked
                                            })
                                        }
                                        className="custom-control-input"
                                        aria-describedby="pages_explanation"
                                    />
                                    <label htmlFor="pages" className="custom-control-label">
                                        Page navigation
                                        <small className="form-text text-secondary" id="pages_explanation">
                                            Shows pages-index in paginated mode.
                                        </small>
                                    </label>
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="buttons-sticky"
                                    type="checkbox"
                                    defaultChecked={collector.settings.buttons === "sticky"}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        collector.changeSettings({
                                            buttons: e.target.checked ? "sticky" : "inline"
                                        })
                                    }
                                    className="custom-control-input"
                                    aria-describedby="buttons-sticky_explanation"
                                />
                                <label htmlFor="buttons-sticky" className="custom-control-label">
                                    Sticky buttons
                                    <small className="form-text text-secondary" id="buttons-sticky_explanation">
                                        Shows buttons sticky to bottom of the collector-window.
                                    </small>
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="progressbar"
                                    type="checkbox"
                                    defaultChecked={collector.settings.progressbar}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        collector.changeSettings({
                                            progressbar: e.target.checked
                                        })
                                    }
                                    className="custom-control-input"
                                    aria-describedby="progressbar_explanation"
                                />
                                <label htmlFor="progressbar" className="custom-control-label">
                                    Progressbar
                                    <small className="form-text text-secondary" id="progressbar_explanation">
                                        Shows progressbar.
                                    </small>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);
