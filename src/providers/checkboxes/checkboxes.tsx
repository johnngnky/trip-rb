import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ICheckbox, ICheckboxes } from "tripetto-forms-checkboxes";

@Tripetto.node("tripetto-forms-checkboxes")
export class Checkboxes extends Tripetto.NodeProvider<{}, JSX.Element, ICheckboxes> {
    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        return (
            <div title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                {this.Props.Checkboxes.map((checkbox: ICheckbox) => {
                    const data = this.Data<boolean>(instance, checkbox.Id);
                    const checked = data ? data.InitialValue : false;

                    return (
                        <label key={checkbox.Id}>
                            <input
                                type="checkbox"
                                defaultChecked={checked}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    if (data) {
                                        data.Data = e.target.checked;
                                    }
                                }}
                            />
                            {checkbox.Name}
                        </label>
                    );
                })}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        return true;
    }
}
