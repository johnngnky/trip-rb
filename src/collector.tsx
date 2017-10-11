import * as Tripetto from "@tripetto/forms-collector";
import * as React from "react";

export class CollectorRenderer extends Tripetto.Collector<{}, JSX.Element> {
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
                <h1>{this.Ontology ? this.Ontology.Name : "Unnamed"}</h1>
                {this.Nodes.map((node: Tripetto.IObservableNode<{}, JSX.Element>) => {
                    /** Render the provider if it is available. */
                    if (node.Provider) {
                        return <div key={node.Id}>{node.Provider.OnRender({}, node.Instance, node.Observer)}</div>;
                    }

                    /** If there is no provider the node should be considered as static text. */
                    return (
                        <div key={node.Id}>
                            {node.Props.NameVisible && node.Props.Name && <h3>{node.Props.Name}</h3>}
                            {node.Props.Description && <p>{node.Props.Description}</p>}
                        </div>
                    );
                })}
                <button type="button" disabled={this.Instance.Steps === 0} onClick={() => this.clickButtonPrevious()}>
                    Back
                </button>
                <button type="button" disabled={this.IsValidationFailed} onClick={() => this.clickButtonNext()}>
                    {this.Instance.IsAtEnd ? "Complete" : "Next"}
                </button>
                <span>{this.ProgressPercentage}%</span>
            </section>
        );
    }
}
