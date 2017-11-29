import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { INumber } from "tripetto-forms-number";

@Tripetto.node("tripetto-forms-number")
export class Number extends Tripetto.NodeProvider<JSX.Element, INumber> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const slot = this.SlotAssert("number");
        const value = this.DataAssert<number>(instance, "number");

        return (
            <div className="form-group">
                {this.Node.Props.Name &&
                    this.Node.Props.NameVisible && (
                        <label>
                            {this.Node.Props.Name}
                            {slot.Required && <span className="text-danger">*</span>}
                        </label>
                    )}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <div className="input-group">
                    <span className="input-group-addon">#</span>
                    <input
                        type="number"
                        required={slot.Required}
                        defaultValue={value.String}
                        placeholder={this.Node.Props.Placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (value.Data = e.target.value)}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = value.String)}
                        className="form-control"
                    />
                </div>
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const slot = this.SlotAssert("number");
        const value = this.DataAssert<number>(instance, slot);

        return !slot.Required || value.String !== "";
    }
}
