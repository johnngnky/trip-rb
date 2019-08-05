import * as React from "react";
import { Collector } from "tripetto-collector-standard-bootstrap";
import { castToBoolean, extendImmutable } from "tripetto-collector";

export const settingsModal = (collector: Collector) => (
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
                                id="setting-mode-paginated"
                                name="mode"
                                defaultChecked={collector.mode === "paginated"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (collector.mode = "paginated")}
                                className="custom-control-input"
                                aria-describedby="setting-mode-paginated-label"
                            />
                            <label htmlFor="setting-mode-paginated" className="custom-control-label">
                                Paginated
                                <small className="form-text text-secondary" id="setting-mode-paginated-label">
                                    Blocks are presented page for page and the user navigates through the pages using the next and back
                                    buttons.
                                </small>
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                type="radio"
                                id="setting-mode-continuous"
                                name="mode"
                                defaultChecked={collector.mode === "continuous"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (collector.mode = "continuous")}
                                className="custom-control-input"
                                aria-describedby="setting-mode-continuous-label"
                            />
                            <label htmlFor="setting-mode-continuous" className="custom-control-label">
                                Continuous
                                <small className="form-text text-secondary" id="setting-mode-continuous-label">
                                    This will keep all past blocks in view as the user navigates using the next and back buttons.
                                </small>
                            </label>
                        </div>
                        <div className="custom-control custom-radio mb-3">
                            <input
                                type="radio"
                                id="setting-mode-progressive"
                                name="mode"
                                defaultChecked={collector.mode === "progressive"}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => (collector.mode = "progressive")}
                                className="custom-control-input"
                                aria-describedby="setting-mode-progressive-label"
                            />
                            <label htmlFor="setting-mode-progressive" className="custom-control-label">
                                Progressive
                                <small className="form-text text-secondary" id="setting-mode-progressive-label">
                                    In this mode all possible blocks are presented to the user. The user does not need to navigate using the
                                    next and back buttons (so we can hide those buttons).
                                </small>
                            </label>
                        </div>
                        <hr />
                        <h6>Display</h6>
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="setting-enumerators"
                                    type="checkbox"
                                    defaultChecked={castToBoolean(collector.style.showEnumerators)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        (collector.style = extendImmutable(collector.style, {
                                            showEnumerators: e.target.checked
                                        }))
                                    }
                                    className="custom-control-input"
                                    aria-describedby="setting-enumerators-label"
                                />
                                <label htmlFor="setting-enumerators" className="custom-control-label">
                                    Enumerators
                                    <small className="form-text text-secondary" id="setting-enumerators-label">
                                        Shows question numbers for blocks that collect data.
                                    </small>
                                </label>
                            </div>
                        </div>
                        {collector.mode === "paginated" && (
                            <div className="form-group">
                                <div className="custom-control custom-checkbox">
                                    <input
                                        id="setting-pages"
                                        type="checkbox"
                                        defaultChecked={castToBoolean(collector.style.showPageIndicators)}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                            (collector.style = extendImmutable(collector.style, {
                                                showPageIndicators: e.target.checked
                                            }))
                                        }
                                        className="custom-control-input"
                                        aria-describedby="setting-pages-label"
                                    />
                                    <label htmlFor="setting-pages" className="custom-control-label">
                                        Pages
                                        <small className="form-text text-secondary" id="setting-pages-label">
                                            Shows an index with pages (only works in paginated mode when there is more than 1 page).
                                        </small>
                                    </label>
                                </div>
                            </div>
                        )}
                        <div className="form-group">
                            <div className="custom-control custom-checkbox">
                                <input
                                    id="setting-progressbar"
                                    type="checkbox"
                                    defaultChecked={castToBoolean(collector.style.showProgressbar, true)}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                        (collector.style = extendImmutable(collector.style, {
                                            showProgressbar: e.target.checked
                                        }))
                                    }
                                    className="custom-control-input"
                                    aria-describedby="setting-progressbar-label"
                                />
                                <label htmlFor="setting-progressbar" className="custom-control-label">
                                    Progressbar
                                    <small className="form-text text-secondary" id="setting-progressbar-label">
                                        Shows a progressbar in the navigation bar.
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
