import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ICheckbox } from "tripetto-forms-checkbox";

@Tripetto.node("tripetto-forms-checkbox")
export class Checkbox extends Tripetto.NodeProvider<JSX.Element, ICheckbox> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const checkbox = this.DataAssert<boolean>(instance, "checked");

        return (
            <div className="form-group checkbox">
                <label>
                    <input
                        type="checkbox"
                        defaultChecked={checkbox.Value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (checkbox.Value = e.target.checked)}
                    />
                    {this.Node.Props.Name}
                    {checkbox.Slot.Required && <span className="text-danger">*</span>}
                </label>
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const checkbox = this.DataAssert<boolean>(instance, "checked");

        return !checkbox.Slot.Required || checkbox.Value;
    }
}
