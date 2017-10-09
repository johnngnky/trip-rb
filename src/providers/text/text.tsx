import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IText } from "tripetto-forms-text";
import "./condition";

@Tripetto.node("tripetto-forms-text")
export class Text extends Tripetto.NodeProvider<{}, JSX.Element, IText> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<string>(instance, "value");
        const value = data ? data.Value : "";

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <input
                    type="text"
                    required={data && data.Slot.Required}
                    defaultValue={value}
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
        const data = this.Data<string>(instance, "value");

        return data ? !data.Slot.Required || data.Value !== "" : false;
    }
}
