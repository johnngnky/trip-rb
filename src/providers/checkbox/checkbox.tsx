import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ICheckbox } from "tripetto-forms-checkbox";

@Tripetto.node("tripetto-forms-checkbox")
export class Checkbox extends Tripetto.NodeProvider<{}, JSX.Element, ICheckbox> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.DataAssert<boolean>(instance, "checked");
        const checked = data.Data = data.Value;

        return (
            <label title={this.Node.Props.Explanation}>
                <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => data.Data = e.target.checked}
                />
                {this.Node.Props.Name + (data.Slot.Required ? "*" : "")}
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const data = this.DataAssert<boolean>(instance, "checked");

        return !data.Slot.Required || data.Value;
    }
}
