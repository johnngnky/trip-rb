import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IEmail } from "tripetto-forms-email";

/* tslint:disable:max-line-length */
const IS_EMAIL = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
/* tslint:enable:max-line-length */

@Tripetto.node("tripetto-forms-email")
export class Email extends Tripetto.NodeProvider<{}, JSX.Element, IEmail> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<string>(instance, "email");
        const email = data ? data.Value : "";

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="email"
                    required={data && data.Slot.Required}
                    defaultValue={email}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        if (data) {
                            data.Data = e.target.value;
                        }
                    }}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const data = this.Data<string>(instance, "email");

        if (data) {
            if (data.Slot.Required && data.Value === "") {
                return false;
            }

            if (data.Value !== "" && !IS_EMAIL.test(data.Value)) {
                return false;
            }

            return true;
        }

        return false;
    }
}
