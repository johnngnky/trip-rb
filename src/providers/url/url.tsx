import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IURL } from "tripetto-forms-url";

@Tripetto.node("tripetto-forms-url")
export class URL extends Tripetto.NodeProvider<{}, JSX.Element, IURL> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<string>(instance, "url");
        const url = data ? data.Value : "";

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="url"
                    required={data && data.Slot.Required}
                    defaultValue={url}
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
        const data = this.Data<string>(instance, "url");

        return data ? !data.Slot.Required || data.Value !== "" : false;
    }
}
