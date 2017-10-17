import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IEmail } from "tripetto-forms-email";

/* tslint:disable:max-line-length */
const IS_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/* tslint:enable:max-line-length */

@Tripetto.node("tripetto-forms-email")
export class Email extends Tripetto.NodeProvider<JSX.Element, IEmail> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const email = this.DataAssert<string>(instance, "email");

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="email"
                    required={email.Slot.Required}
                    defaultValue={email.Value}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (email.Value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = email.String)}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const email = this.DataAssert<string>(instance, "email");

        if (email.Slot.Required && email.Value === "") {
            return false;
        }

        if (email.Value !== "" && !IS_EMAIL.test(email.Value)) {
            return false;
        }

        return true;
    }
}
