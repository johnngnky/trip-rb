import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IEmail } from "tripetto-forms-email";

/* tslint:disable-next-line:max-line-length */
const IS_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

@Tripetto.node("tripetto-forms-email")
export class Email extends Tripetto.NodeProvider<JSX.Element, IEmail> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const slot = this.SlotAssert("email");
        const email = this.DataAssert<string>(instance, slot);

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
                    <span className="input-group-addon">@</span>
                    <input
                        type="email"
                        required={slot.Required}
                        defaultValue={email.Value}
                        placeholder={this.Node.Props.Placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (email.Value = e.target.value)}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = email.String)}
                        className="form-control"
                    />
                </div>
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const slot = this.SlotAssert("email");
        const email = this.DataAssert<string>(instance, slot);

        if (slot.Required && email.Value === "") {
            return false;
        }

        if (email.Value !== "" && !IS_EMAIL.test(email.Value)) {
            return false;
        }

        return true;
    }
}
