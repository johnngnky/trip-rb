import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Blocks } from "./helpers/blocks";
import { ICollectorProps } from "./helpers/interfaces/props";
import { ICollectorSettings } from "./helpers/interfaces/settings";
import { buttons } from "./helpers/buttons";
import { progressbar } from "./helpers/progressbar";
import { pages } from "./helpers/pages";
import "./index.scss";
import "./blocks";

export class Collector extends React.PureComponent<ICollectorProps> {
    /** Contains the blocks renderer instance. */
    readonly blocks = new Blocks(this.props.definition, this.props.mode || "paginated", this.props.snapshot, this.props.preview);

    /** Contains some mutable settings for the collector (they can be changed during runtime). */
    readonly settings = {
        numerators: Tripetto.castToBoolean(this.props.numerators, false),
        pages: Tripetto.castToBoolean(this.props.pages, true),
        buttons: this.props.buttons || "inline",
        progressbar: Tripetto.castToBoolean(this.props.progressbar, false)
    };

    /** Render the collector. */
    render(): JSX.Element {
        return (
            <>
                <section className={`container${this.settings.buttons === "sticky" && !this.blocks.preview ? " sticky" : ""}`}>
                    <div className="row">
                        <div className="col">
                            {this.blocks.render(this.settings) ||
                                (this.blocks.isEmpty && (
                                    <div className="text-center mt-5">
                                        <h3>👋 The form stopped itself</h3>
                                        <p className="text-secondary">
                                            The form stopped immediately after it was started because there are no blocks in it. Add blocks
                                            to the form first to get the magic going.
                                        </p>
                                    </div>
                                )) ||
                                (this.blocks.isFinished && (
                                    <div className="text-center mt-5">
                                        <h3>✔ You’ve completed the form</h3>
                                        <p className="text-secondary">
                                            For the purpose of this demo the form output is visible in your browser’s developer console. Go
                                            there to see the collected data.
                                        </p>
                                    </div>
                                )) ||
                                (this.blocks.isStopped && (
                                    <div className="text-center mt-5">
                                        <h3>⏹ You’ve stopped the form</h3>
                                        <p className="text-secondary">Press the play icon to start a new session.</p>
                                    </div>
                                )) ||
                                (this.blocks.isPaused && (
                                    <div className="text-center mt-5">
                                        <h3>⏸ You’ve paused the form</h3>
                                        <p className="text-secondary">
                                            For the purpose of this demo the paused form is saved in your browser’s local store. Refresh the
                                            browser to resume the paused form.
                                        </p>
                                    </div>
                                )) || (
                                    <div className="text-center mt-5">
                                        <h3>⏹ You haven’t started the form yet</h3>
                                        <p className="text-secondary">Press the play icon to start a new session.</p>
                                    </div>
                                )}
                        </div>
                    </div>
                </section>
                {!this.blocks.preview && this.settings.buttons === "sticky" && this.blocks.storyline && (
                    <nav className="navbar navbar-expand navbar-dark bg-light buttons-sticky">
                        <div className="container">
                            {buttons(this.blocks.storyline)}
                            {this.settings.pages && pages(this.blocks.storyline)}
                            {this.settings.progressbar && progressbar(this.blocks.storyline)}
                        </div>
                    </nav>
                )}
            </>
        );
    }

    /** Bind to some events. */
    componentDidMount(): void {
        this.blocks.onChange = () => {
            // Since the collector has the actual state, we need to update the component.
            // We are good React citizens. We only do this when necessary!
            this.forceUpdate();

            // If the `update` prop contains a ref of another component, update that component as well.
            // Kinda hacky approach used to keep the header (that lives as a separate component) in sync :-)
            if (this.props.update && this.props.update.current) {
                this.props.update.current.forceUpdate();
            }
        };

        this.blocks.onFinish = (instance: Tripetto.Instance) => {
            if (this.props.onFinish) {
                this.props.onFinish(instance);
            }
        };
    }

    /** Change settings. */
    changeSettings(settings: Partial<ICollectorSettings>): void {
        this.settings.numerators = Tripetto.isBoolean(settings.numerators) ? settings.numerators : this.settings.numerators;
        this.settings.pages = Tripetto.isBoolean(settings.pages) ? settings.pages : this.settings.pages;
        this.settings.buttons = Tripetto.isString(settings.buttons) ? settings.buttons : this.settings.buttons;
        this.settings.progressbar = Tripetto.isBoolean(settings.progressbar) ? settings.progressbar : this.settings.progressbar;

        this.forceUpdate();
    }

    /** Reloads with a new definition. */
    reload(definition: Tripetto.IDefinition): void {
        this.blocks.reload(definition);
    }

    /** Pauses the collector. */
    pause(): Tripetto.ISnapshot | undefined {
        const snapshot = this.blocks.pause();

        if (snapshot && this.props.onPause) {
            this.props.onPause(snapshot);
        }

        return snapshot;
    }
}
