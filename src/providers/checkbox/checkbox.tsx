import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ICheckbox } from "tripetto-forms-checkbox";

@Tripetto.node("tripetto-forms-checkbox")
export class Checkbox extends Tripetto.NodeProvider<JSX.Element, ICheckbox> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const slot = this.SlotAssert("checked");
        const checkbox = this.DataAssert<boolean>(instance, slot);

        return (
            <div className="form-group checkbox">
                <label>
                    <input
                        type="checkbox"
                        defaultChecked={checkbox.Value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (checkbox.Value = e.target.checked)}
                    />
                    {this.Node.Props.Name}
                    {slot.Required && <span className="text-danger">*</span>}
                </label>
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const slot = this.SlotAssert("checked");
        const checkbox = this.DataAssert<boolean>(instance, slot);

        return !slot.Required || checkbox.Value;
    }
}
