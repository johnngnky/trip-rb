import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IText } from "tripetto-forms-text";
import "./condition";

@Tripetto.node("tripetto-forms-text")
export class Text extends Tripetto.NodeProvider<JSX.Element, IText> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const value = this.DataAssert<string>(instance, "value");

        return (
            <div className="form-group">
                {this.Node.Props.Name &&
                    this.Node.Props.NameVisible && (
                        <label>
                            {this.Node.Props.Name}
                            {value.Slot.Required && <span className="text-danger">*</span>}
                        </label>
                    )}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="text"
                    required={value.Slot.Required}
                    defaultValue={value.Value}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (value.Value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = value.String)}
                    className="form-control"
                />
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const value = this.DataAssert<string>(instance, "value");

        return !value.Slot.Required || value.Value !== "";
    }
}
