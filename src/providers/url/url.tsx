import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IURL } from "tripetto-forms-url";

@Tripetto.node("tripetto-forms-url")
export class URL extends Tripetto.NodeProvider<{}, JSX.Element, IURL> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const url = this.DataAssert<string>(instance, "url");

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="url"
                    required={url.Slot.Required}
                    defaultValue={url.InitialString}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (url.Data = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = url.String)}
                />
            </label>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const url = this.DataAssert<string>(instance, "url");

        return !url.Slot.Required || url.Value !== "";
    }
}
