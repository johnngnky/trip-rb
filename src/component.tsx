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
    private completed = false;

    constructor(props: IProps) {
        super();

        this.collector = new CollectorRenderer(
            props.definition,
            props.verbose || false,
            () => this.update(),
            (instance: Tripetto.Instance, type: "ended" | "stopped" | "paused") => {
                this.completed = true;

                // Output the collected data to the console
                console.dir(instance.Data.Values);
            }
        );

        if (!props.snapshot || !this.collector.Resume(props.snapshot)) {
            this.collector.Start("single");
        }
    }

    private update(): void {
        if (this.mounted) {
            this.forceUpdate();
        }
    }

    public render(): JSX.Element {
        if (this.completed) {
            return <div>Your form is completed! Now watch the collected data in your browser console.</div>;
        }

        return this.collector.Rendering;
    }

    public componentDidMount(): void {
        this.mounted = true;
    }

    public componentWillUnmount(): void {
        this.mounted = false;
    }
}
