import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IText } from "tripetto-forms-text";
import "./condition";

@Tripetto.node("tripetto-forms-text")
export class Text extends Tripetto.NodeProvider<{}, JSX.Element, IText> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const value = this.DataAssert<string>(instance, "value");

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="text"
                    required={value.Slot.Required}
                    defaultValue={value.InitialString}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (value.Data = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = value.String)}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const value = this.DataAssert<string>(instance, "value");

        return !value.Slot.Required || value.Value !== "";
    }
}
