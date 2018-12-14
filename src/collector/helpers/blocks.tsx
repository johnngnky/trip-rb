import * as Tripetto from "tripetto-collector";
import * as React from "react";
import { ICollectorSettings } from "./interfaces/settings";
import { IBlockRenderer } from "./interfaces/renderer";
import { markdownToJSX } from "./markdown";
import { buttons } from "./buttons";
import { progressbar } from "./progressbar";
import { pages } from "./pages";

export class Blocks extends Tripetto.Collector<IBlockRenderer> {
    render(settings: ICollectorSettings): JSX.Element | undefined {
        const storyline = this.storyline;

        return (
            storyline && (
                <>
                    {storyline.map((moment: Tripetto.Moment<IBlockRenderer>, momentIndex: number) =>
                        moment.nodes.map((node: Tripetto.IObservableNode<IBlockRenderer>, nodeIndex: number) =>
                            node.block ? (
                                <div key={node.key}>
                                    {node.block.render({
                                        name: (required?: boolean, labelFor?: string) =>
                                            Tripetto.isString(node.props.name) &&
                                            Tripetto.castToBoolean(node.props.nameVisible, true) && (
                                                <label htmlFor={labelFor}>
                                                    {settings.enumerators && node.enumerator && `${node.enumerator}. `}
                                                    {markdownToJSX(node.props.name || "...", node.context)}
                                                    {required && <span className="text-danger">*</span>}
                                                </label>
                                            ),
                                        label: (required?: boolean) => (
                                            <>
                                                {markdownToJSX(node.props.name || "...", node.context, false)}
                                                {required && <span className="text-danger">*</span>}
                                            </>
                                        ),
                                        get description(): React.ReactNode {
                                            return (
                                                node.props.description && (
                                                    <p className="text-secondary">{markdownToJSX(node.props.description, node.context)}</p>
                                                )
                                            );
                                        },
                                        explanation(label?: string): React.ReactNode {
                                            return (
                                                node.props.explanation && (
                                                    <small className="form-text text-secondary" id={label}>
                                                        {markdownToJSX(node.props.explanation, node.context)}
                                                    </small>
                                                )
                                            );
                                        },
                                        get placeholder(): string {
                                            return Tripetto.markdownifyToString(node.props.placeholder || "", node.context, "...");
                                        }
                                    })}
                                </div>
                            ) : (
                                <div key={node.key} className={momentIndex === 0 && nodeIndex === 0 ? "" : "separate"}>
                                    {Tripetto.castToBoolean(node.props.nameVisible, true) && (
                                        <h3>{markdownToJSX(node.props.name || "...", node.context)}</h3>
                                    )}
                                    {node.props.description && (
                                        <p className="text-secondary">{markdownToJSX(node.props.description, node.context, true)}</p>
                                    )}
                                </div>
                            )
                        )
                    )}

                    {storyline.isEmpty && (
                        <div className="text-center mt-5">
                            <h3>👋 Nothing to show here yet</h3>
                            <p className="text-secondary">Add blocks to the form first to get the magic going.</p>
                        </div>
                    )}

                    {!this.isPreview && settings.buttons === "inline" && (
                        <div className="row buttons-inline">
                            {buttons(storyline)}
                            {settings.pages && pages(storyline)}
                            {settings.progressbar && progressbar(storyline)}
                        </div>
                    )}
                </>
            )
        );
    }
}
