import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { CollectorRenderer } from "./collector";

interface IProps {
    /** Form definition. */
    definition: Tripetto.IMap | string;

    /** Snapshot data if your component should resume an instance. */
    snapshot?: Tripetto.ISnapshot;

    /** Specifies if verbose mode is enabled. This outputs detailed information to the console. */
    verbose?: boolean;
}

export class Collector extends React.Component<IProps> {
    private readonly collector: CollectorRenderer;
    private mounted = false;
    private status: "running" | "ended" | "stopped" | "paused" = "running";

    constructor(props: IProps) {
        super();

        this.collector = new CollectorRenderer(props.definition, props.verbose || false, this.update.bind(this), this.end.bind(this));

        if (!props.snapshot || !this.collector.Resume(props.snapshot)) {
            this.collector.Start("single");
        }
    }

    private update(): void {
        if (this.mounted) {
            this.forceUpdate();
        }
    }

    private end(instance: Tripetto.Instance, type: "ended" | "stopped" | "paused"): void {
        this.status = type;

        if (type === "ended") {
            // Output the collected data to the console
            console.dir(instance.Data.Values);
        }
    }

    public render(): JSX.Element {
        switch (this.status) {
            case "running":
                return this.collector.render();
            case "ended":
                return <div>Your form is completed! Now watch the collected data in your browser console.</div>;
            case "stopped":
                return <div>Your form is stopped! No data is available.</div>;
            case "paused":
                return <div>Your form is paused!</div>;
        }
    }

    public componentDidMount(): void {
        this.mounted = true;
    }

    public componentWillUnmount(): void {
        this.mounted = false;
    }
}
