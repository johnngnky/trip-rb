import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IRadiobutton, IRadiobuttons } from "tripetto-forms-radiobuttons";

@Tripetto.node("tripetto-forms-radiobuttons")
export class Radiobuttons extends Tripetto.NodeProvider<{}, JSX.Element, IRadiobuttons> {
    private Update(data: Tripetto.Data | undefined, id: string | undefined): void {
        const value = Tripetto.F.FindFirst(this.Props.Radiobuttons, (radiobutton: IRadiobutton) => radiobutton.Id === id);

        if (data) {
            data.Set(value ? value.Value || value.Name : value, id);
        }
    }

    public OnRender(context: {}, instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const data = this.Data<string>(instance, "button");
        const selected =
            Tripetto.F.FindFirst(
                this.Props.Radiobuttons,
                (radiobutton: IRadiobutton) => Tripetto.F.CastToBoolean(data && data.Reference === radiobutton.Id)) ||
            Tripetto.F.ArrayItem(this.Props.Radiobuttons, 0);

        return (
            <div title={this.Node.Props.Explanation}>
                {this.Node.Props.Name && this.Node.Props.NameVisible && this.Node.Props.Name}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                {this.Props.Radiobuttons.map((radiobutton: IRadiobutton) => {
                    return (
                        <label key={radiobutton.Id}>
                            <input
                                type="radio"
                                name={this.Node.Props.Id}
                                defaultChecked={selected === radiobutton}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.Update(data, radiobutton.Id)}
                            />
                            {radiobutton.Name}
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
