import * as Tripetto from "@tripetto/forms-collector";
import * as React from "react";

export class CollectorWrapper extends Tripetto.Collector<JSX.Element> {
    /** Previous button is clicked. */
    private clickButtonPrevious(): void {
        if (this.Observer) {
            this.Observer.Cancel();
        }
    }

    /** Next button is clicked. */
    private clickButtonNext(): void {
        if (this.Observer) {
            this.Observer.Done();
        }
    }

    /** Retrieves the collector rendering. */
    public render(): JSX.Element | undefined {
        if (!this.Instance || !this.Instance.IsRunning) {
            return undefined;
        }

        return (
            <section>
                {this.Nodes.map((node: Tripetto.IObservableNode<JSX.Element>) => {
                    /** Render the provider if it is available. */
                    if (node.Provider) {
                        return <div key={node.Key}>{node.Provider.OnRender(node.Instance, node.Observer)}</div>;
                    }

                    /** If there is no provider the node should be considered as static text. */
                    return (
                        <div key={node.Key}>
                            {node.Props.NameVisible && node.Props.Name && <h3>{node.Props.Name}</h3>}
                            {node.Props.Description && <p className="text-info">{node.Props.Description}</p>}
                        </div>
                    );
                })}

                <nav className="navbar navbar-default navbar-fixed-bottom">
                    <div className="container">
                        <div className="btn-toolbar" role="toolbar" style={{ marginTop: "20px" }}>
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className="btn btn-default"
                                    disabled={this.Instance.Steps === 0}
                                    onClick={() => this.clickButtonPrevious()}
                                >
                                    Back
                                </button>
                            </div>
                            <div className="btn-group" role="group">
                                <button
                                    type="button"
                                    className={this.Instance.IsAtEnd ? "btn btn-success" : "btn btn-primary"}
                                    disabled={this.IsValidationFailed}
                                    onClick={() => this.clickButtonNext()}
                                >
                                    {this.Instance.IsAtEnd ? "Complete" : "Next"}
                                </button>
                            </div>
                        </div>
                        <div className="progress" style={{ marginTop: "20px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuenow={this.ProgressPercentage}
                                aria-valuemin={0}
                                aria-valuemax={100}
                                style={{ width: `${this.ProgressPercentage}%`, minWidth: "2em" }}
                            >
                                {this.ProgressPercentage}%
                            </div>
                        </div>
                    </div>
                </nav>
            </section>
        );
    }
}
