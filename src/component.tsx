import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { CollectorWrapper } from "./wrapper";

interface IProps {
    /** Form definition. */
    definition: Tripetto.IMap | string;

    /** Snapshot data if your component should resume an instance. */
    snapshot?: Tripetto.ISnapshot;

    /** Specifies if verbose mode is enabled. This outputs detailed information to the console. */
    verbose?: boolean;
}

export class Collector extends React.Component<IProps> {
    private readonly collector: CollectorWrapper;
    private mounted = false;
    private resumeData: Tripetto.ISnapshot | undefined;

    constructor(props: IProps) {
        super(props);

        this.collector = new CollectorWrapper(props.definition, props.verbose || false, this.update.bind(this), this.end.bind(this));

        if (!props.snapshot || !this.collector.Resume(props.snapshot)) {
            this.collector.Start("single");
        }
    }

    private update(): void {
        if (this.mounted) {
            // We are good React citizens. We only do this when necessary. But the state is inside the Tripetto Collector.
            this.forceUpdate();
        }
    }

    private end(instance: Tripetto.Instance, type: "ended" | "stopped" | "paused"): void {
        if (type === "ended") {
            // Output the collected data to the console
            console.dir(instance.Data.Values);
        }
    }

    public render(): JSX.Element | JSX.Element[] | string {
        let content = this.collector.render();

        if (!content) {
            if (this.collector.IsEnded) {
                content = (
                    <div>
                        <h3>Form completed!</h3>
                        <p className="text-info">Open the developer console to see the collected data.</p>
                    </div>
                );
            } else if (this.collector.IsStopped) {
                content = (
                    <div>
                        <h3>Form is stopped!</h3>
                        <p className="text-info">
                            Click <b>Start</b> to start a new session.
                        </p>
                    </div>
                );
            } else if (this.collector.IsPaused) {
                content = (
                    <div>
                        <h3>Form paused!</h3>
                        <p className="text-info">
                            Click <b>Resume</b> to resume it. Open the developer console to see the resume data.
                        </p>
                    </div>
                );
            } else {
                content = (
                    <div>
                        <h3>Form not running</h3>
                        <p className="text-info">Refresh your browser.</p>
                    </div>
                );
            }
        }

        return (
            <section className="container" style={{ paddingTop: "70px", paddingBottom: "70px" }}>
                <nav className="navbar navbar-default navbar-fixed-top">
                    <div className="container">
                        <div className="navbar-header navbar-brand">
                            {this.collector.Ontology ? this.collector.Ontology.Name : "Unnamed"}
                        </div>
                        <div className="btn-group navbar-btn navbar-right" role="group">
                            <button
                                type="button"
                                className="btn btn-default"
                                disabled={!this.collector.IsStopped && !this.collector.IsEnded}
                                onClick={() => this.collector.Start()}
                            >
                                Start
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                disabled={!this.collector.IsRunning}
                                onClick={() => console.dir((this.resumeData = this.collector.Pause()))}
                            >
                                Pause
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                disabled={!this.collector.IsPaused || !this.resumeData}
                                onClick={() => {
                                    if (this.resumeData) {
                                        this.collector.Resume(this.resumeData);
                                    }
                                }}
                            >
                                Resume
                            </button>
                            <button
                                type="button"
                                className="btn btn-default"
                                disabled={!this.collector.IsRunning}
                                onClick={() => this.collector.Stop()}
                            >
                                Stop
                            </button>
                        </div>
                    </div>
                </nav>

                <section>{content}</section>
            </section>
        );
    }

    public componentDidMount(): void {
        this.mounted = true;
    }

    public componentWillUnmount(): void {
        this.mounted = false;
    }
}
