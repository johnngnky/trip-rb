import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IPassword } from "tripetto-forms-password";

@Tripetto.node("tripetto-forms-password")
export class Password extends Tripetto.NodeProvider<{}, JSX.Element, IPassword> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const password = this.DataAssert<string>(instance, "password");

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="password"
                    required={password.Slot.Required}
                    defaultValue={password.InitialValue}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (password.Data = e.target.value)}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const password = this.DataAssert<string>(instance, "password");

        return !password.Slot.Required || password.Value !== "";
    }
}
