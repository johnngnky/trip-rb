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

    constructor(props: IProps) {
        super();

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
        if (this.collector.IsEnded) {
            return `Your form is completed! Now watch the collected data in your browser console.`;
        } else if (this.collector.IsStopped) {
            return `Your form is stopped! No data is available.`;
        } else if (this.collector.IsPaused) {
            return `Your form is paused! You can resume it, if you have the resume data.`;
        }

        return this.collector.render() || `Your form is not running.`;
    }

    public componentDidMount(): void {
        this.mounted = true;
    }

    public componentWillUnmount(): void {
        this.mounted = false;
    }
}
