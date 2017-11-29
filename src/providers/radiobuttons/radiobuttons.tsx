import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IRadiobutton, IRadiobuttons } from "tripetto-forms-radiobuttons";

@Tripetto.node("tripetto-forms-radiobuttons")
export class Radiobuttons extends Tripetto.NodeProvider<JSX.Element, IRadiobuttons> {
    private Update(data: Tripetto.Data<string>, id: string | undefined): void {
        const value = Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton: IRadiobutton) => radiobutton.Id === id);

        data.Set(value ? value.Value || value.Name : value, id);
    }

    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const button = this.DataAssert<string>(instance, "button");
        const selected =
            Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton: IRadiobutton) =>
                Tripetto.F.CastToBoolean(button.Reference === radiobutton.Id)
            ) || Tripetto.F.ArrayItem(this.Props.Radiobuttons, 0);

        if (selected) {
            this.Update(button, selected.Id);
        }

        return (
            <div className="form-group">
                {this.Node.Props.Name && this.Node.Props.NameVisible && <label>{this.Node.Props.Name}</label>}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                {this.Props.Radiobuttons.map((radiobutton: IRadiobutton) => {
                    return (
                        <div className="radio" key={radiobutton.Id}>
                            <label>
                                <input
                                    type="radio"
                                    name={this.Node.Props.Id}
                                    defaultChecked={selected === radiobutton}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.Update(button, radiobutton.Id)}
                                />
                                {radiobutton.Name}
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
