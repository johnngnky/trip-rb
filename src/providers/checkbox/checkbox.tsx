import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ICheckbox } from "tripetto-forms-checkbox";

@Tripetto.node("tripetto-forms-checkbox")
export class Checkbox extends Tripetto.NodeProvider<{}, JSX.Element, ICheckbox> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<boolean>(instance, "checked");
        const checked = data ? data.Value : false;

        return (
            <label title={this.Node.Props.Explanation}>
                <input
                    type="checkbox"
                    defaultChecked={checked}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (data) {
                            data.Data = e.target.checked;
                        }
                    }}
                />
                {this.Node.Props.Name + (data && data.Slot.Required ? "*" : "")}
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const data = this.Data<boolean>(instance, "checked");

        return data ? !data.Slot.Required || data.Value : false;
    }
}
