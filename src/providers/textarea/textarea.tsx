import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ITextarea } from "tripetto-forms-textarea";

@Tripetto.node("tripetto-forms-textarea")
export class Textarea extends Tripetto.NodeProvider<JSX.Element, ITextarea> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const slot = this.SlotAssert("value");
        const value = this.DataAssert<string>(instance, slot);

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
                <textarea
                    rows={3}
                    required={slot.Required}
                    defaultValue={value.Value}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (value.Value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => ((e.target as HTMLTextAreaElement).value = value.String)}
                    className="form-control"
                />
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const slot = this.SlotAssert("value");
        const value = this.DataAssert<string>(instance, slot);

        return !slot.Required || value.Value !== "";
    }
}
