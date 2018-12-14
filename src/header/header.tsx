import * as React from "react";
import { Editor } from "tripetto";
import { Collector } from "../collector/collector";
import { Blocks } from "../collector/helpers/blocks";
import { settingsModal } from "./settings";
import "./header.scss";

export class Header extends React.PureComponent<{
    collector: React.RefObject<Collector>;
    editor: Editor;
    reset: () => void;
}> {
    private get collector(): Collector {
        if (this.props.collector.current instanceof Collector) {
            return this.props.collector.current;
        }

        throw new Error("Collector ref is not available!");
    }

    private get blocks(): Blocks {
        return this.collector.blocks;
    }

    render(): React.ReactNode {
        return (
            <>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6 d-flex align-items-center">
                            <h1 className="mr-1 mr-md-3 text-truncate" onClick={() => this.props.editor.edit()}>
                                {this.blocks.name || "Unnamed"}
                            </h1>
                            <a
                                href="https://gitlab.com/tripetto/examples/react"
                                target="_blank"
                                role="button"
                                className="btn btn-sm btn-link"
                            >
                                <i className="fas fa-code pr-2" />
                                Get source
                            </a>
                            <a
                                href="https://gitlab.com/tripetto/examples/react/blob/master/README.md"
                                target="_blank"
                                role="button"
                                className="btn btn-sm btn-link"
                            >
                                <i className="fas fa-book-reader pr-2" />
                                View readme
                            </a>
                            <a href="#" onClick={() => this.props.reset()} role="button" className="btn btn-sm btn-link">
                                <i className="fas fa-redo pr-2" />
                                Reset demo
                            </a>
                        </div>
                        <div className="col-6 d-flex justify-content-end align-items-center">
                            {!this.blocks.preview && (
                                <>
                                    <div className="btn-group mr-1 mr-md-4" role="group" aria-label="Controls">
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            title="Start form"
                                            disabled={!this.blocks.isStopped && !this.blocks.isFinished}
                                            onClick={() => this.collector.start()}
                                        >
                                            <i className="fas fa-play fa-fw" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            title="Pause form"
                                            disabled={!this.blocks.isRunning}
                                            onClick={() => this.collector.pause()}
                                        >
                                            <i className="fas fa-pause fa-fw" />
                                        </button>
                                        <button
                                            type="button"
                                            className="btn btn-primary"
                                            title="Stop form"
                                            disabled={!this.blocks.isRunning}
                                            onClick={() => this.collector.stop()}
                                        >
                                            <i className="fas fa-stop fa-fw" />
                                        </button>
                                    </div>
                                    <button
                                        type="button"
                                        className="btn btn-primary mr-1 mr-md-4"
                                        data-toggle="modal"
                                        data-target="#settingsModal"
                                    >
                                        Settings
                                    </button>
                                </>
                            )}
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <button
                                    type="button"
                                    className={`btn ${!this.blocks.preview ? "btn-success" : "btn-secondary"}`}
                                    data-toggle="button"
                                    aria-pressed={!this.blocks.preview}
                                    onClick={() => (this.blocks.preview = false)}
                                >
                                    Collect
                                </button>
                                <button
                                    type="button"
                                    className={`btn ${this.blocks.preview ? "btn-success" : "btn-secondary"}`}
                                    data-toggle="button"
                                    aria-pressed={this.blocks.preview}
                                    onClick={() => (this.blocks.preview = true)}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {settingsModal(this.collector)}
            </>
        );
    }
}
