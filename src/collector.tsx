import * as Tripetto from "@tripetto/forms-collector";
import * as React from "react";

export class CollectorRenderer extends Tripetto.Collector<{}, JSX.Element> {
    /** Retrieves the collector rendering. */
    public get Rendering(): JSX.Element {
        if (!this.Instance || !this.Instance.IsRunning) {
            return <div>No instance available!</div>;
        }

        return (
            <section>
                <h1>{this.Ontology ? this.Ontology.Name : "Unnamed"}</h1>
                {this.Nodes.map((node: Tripetto.IObservableNode<{}, JSX.Element>) => {
                    /** If a provider is attached, render it. */
                    if (node.Provider) {
                        return <div key={node.Id}>{node.Provider.OnRender({}, node.Instance, node.Observer)}</div>;
                    }

                    /** If no provider, consider the node as static text. */
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

    /** Previous button is clicked. */
    private clickButtonPrevious(): void {
        if (this.Observer) {
            this.Observer.Cancel();
        }
    }

    /** Next button is clicked. */
    private clickButtonNext(): void {
        console.dir(this);
        if (this.Observer) {
            this.Observer.Done();
        }
    }

    /** An instance ends. */
    public OnInstanceEnd(instance: Tripetto.Instance, type: "ended" | "stopped" | "paused"): void {
        super.OnInstanceEnd(instance, type);

        if (type === "ended") {
            // Output the collected data to the console
            console.dir(instance.Data.Values);

            alert("Your form is completed! Now watch the collected data in your browser console.");
        }
    }
}
