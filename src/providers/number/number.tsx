import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { INumber } from "tripetto-forms-number";

@Tripetto.node("tripetto-forms-number")
export class Number extends Tripetto.NodeProvider<JSX.Element, INumber> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const value = this.DataAssert<number>(instance, "number");

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="number"
                    required={value.Slot.Required}
                    defaultValue={value.String}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (value.Data = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = value.String)}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const value = this.DataAssert<number>(instance, "number");

        return !value.Slot.Required || value.String !== "";
    }
}
