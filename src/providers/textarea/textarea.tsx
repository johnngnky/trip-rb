import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ITextarea } from "tripetto-forms-textarea";

@Tripetto.node("tripetto-forms-textarea")
export class Password extends Tripetto.NodeProvider<{}, JSX.Element, ITextarea> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<string>(instance, "value");
        const value = data ? data.Value : "";

        return (
            <label title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <textarea
                    rows={3}
                    required={data && data.Slot.Required}
                    defaultValue={value}
                    placeholder={this.Node.Props.Placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
