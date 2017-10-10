import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ITextarea } from "tripetto-forms-textarea";

@Tripetto.node("tripetto-forms-textarea")
export class Password extends Tripetto.NodeProvider<{}, JSX.Element, ITextarea> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const value = this.DataAssert<string>(instance, "value");

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <textarea
                    rows={3}
                    required={value.Slot.Required}
                    defaultValue={value.InitialString}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (value.Data = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => ((e.target as HTMLTextAreaElement).value = value.String)}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const value = this.DataAssert<string>(instance, "value");

        return !value.Slot.Required || value.Value !== "";
    }
}
