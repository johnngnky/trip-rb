import * as React from "react";
import { Editor } from "tripetto";
import { Collector } from "../collector";
import { Blocks } from "../collector/blocks/blocks";
import { settingsModal } from "./settings";
import "./index.scss";

export class Header extends React.PureComponent<{
    collector: React.RefObject<Collector>;
    editor: Editor;
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
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <div className="navbar-header navbar-brand my-2 font-weight-bold" onClick={() => this.props.editor.edit()}>
                                {this.blocks.name || "Unnamed"}
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-4">
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <button
                                    type="button"
                                    className={`btn btn-lg ${!this.blocks.preview ? "btn-success" : "btn-secondary"}`}
                                    data-toggle="button"
                                    aria-pressed={!this.blocks.preview}
                                    onClick={() => (this.blocks.preview = false)}
                                >
                                    Collect
                                </button>
                                <button
                                    type="button"
                                    className={`btn btn-lg ${this.blocks.preview ? "btn-success" : "btn-secondary"}`}
                                    data-toggle="button"
                                    aria-pressed={this.blocks.preview}
                                    onClick={() => (this.blocks.preview = true)}
                                >
                                    Preview
                                </button>
                            </div>
                        </div>
                        {!this.blocks.preview && (
                            <div className="col-8 text-right">
                                <div className="btn-group" role="group" aria-label="Controls">
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary"
                                        title="Start form"
                                        disabled={!this.blocks.isStopped && !this.blocks.isFinished}
                                        onClick={() => this.blocks.start()}
                                    >
                                        <i className="fas fa-play fa-fw" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary"
                                        title="Pause form"
                                        disabled={!this.blocks.isRunning}
                                        onClick={() => this.collector.pause()}
                                    >
                                        <i className="fas fa-pause fa-fw" />
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-lg btn-primary"
                                        title="Stop form"
                                        disabled={!this.blocks.isRunning}
                                        onClick={() => this.blocks.stop()}
                                    >
                                        <i className="fas fa-stop fa-fw" />
                                    </button>
                                </div>
                                <button
                                    type="button"
                                    className="btn btn-lg btn-primary ml-2"
                                    data-toggle="modal"
                                    data-target="#settingsModal"
                                >
                                    Settings
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {settingsModal(this.collector, this.blocks)}
            </>
        );
    }
}
