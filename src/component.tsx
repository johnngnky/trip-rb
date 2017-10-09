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

    constructor(props: IProps) {
        super();

        this.collector = new CollectorRenderer(props.definition, props.verbose || false, () => this.update());

        if (!props.snapshot || !this.collector.Resume(props.snapshot)) {
            this.collector.Start("single");
        }
    }

    /** Invoked only when the component should update. */
    private update(): void {
        if (this.mounted) {
            this.forceUpdate();
        }
    }

    public render(): JSX.Element {
        return this.collector.Rendering;
    }

    public componentDidMount(): void {
        this.mounted = true;
    }

    public componentWillUnmount(): void {
        this.mounted = false;
    }
}
