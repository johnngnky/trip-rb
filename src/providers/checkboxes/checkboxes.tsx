import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { ICheckbox, ICheckboxes } from "tripetto-forms-checkboxes";

@Tripetto.node("tripetto-forms-checkboxes")
export class Checkboxes extends Tripetto.NodeProvider<JSX.Element, ICheckboxes> {
    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        return (
            <div className="form-group">
                {this.Node.Props.Name && this.Node.Props.NameVisible && <label>{this.Node.Props.Name}</label>}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                {this.Props.Checkboxes.map((checkbox: ICheckbox) => {
                    const data = this.Data<boolean>(instance, checkbox.Id);
                    const checked = data ? data.Value : false;

                    return (
                        <div key={checkbox.Id} className="checkbox">
                            <label>
                                <input
                                    type="checkbox"
                                    defaultChecked={checked}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                        if (data) {
                                            data.Value = e.target.checked;
                                        }
                                    }}
                                />
                                {checkbox.Name}
                            </label>
                        </div>
                    );
                })}
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        return true;
    }
}
