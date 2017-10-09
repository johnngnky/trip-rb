import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IPassword } from "tripetto-forms-password";

@Tripetto.node("tripetto-forms-password")
export class Password extends Tripetto.NodeProvider<{}, JSX.Element, IPassword> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<string>(instance, "password");
        const password = data ? data.Value : "";

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="password"
                    required={data && data.Slot.Required}
                    defaultValue={password}
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
        const data = this.Data<string>(instance, "password");

        return data ? !data.Slot.Required || data.Value !== "" : false;
    }
}
