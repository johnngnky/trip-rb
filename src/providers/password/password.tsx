import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IPassword } from "tripetto-forms-password";

@Tripetto.node("tripetto-forms-password")
export class Password extends Tripetto.NodeProvider<JSX.Element, IPassword> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const slot = this.SlotAssert("password");
        const password = this.DataAssert<string>(instance, "password");

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
                <input
                    type="password"
                    required={slot.Required}
                    defaultValue={password.Value}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (password.Value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = password.String)}
                    className="form-control"
                />
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const slot = this.SlotAssert("password");
        const password = this.DataAssert<string>(instance, slot);

        return !slot.Required || password.Value !== "";
    }
}
