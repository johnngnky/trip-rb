import * as React from "react";
import * as Tripetto from "@tripetto/forms-collector";
import { IDropdown, IDropdownOption } from "tripetto-forms-dropdown";
import "./condition";

@Tripetto.node("tripetto-forms-dropdown")
export class Dropdown extends Tripetto.NodeProvider<JSX.Element, IDropdown> {
    private Update(data: Tripetto.Data, id: string | undefined): void {
        const value = Tripetto.F.FindFirst(this.Props.Options, (option: IDropdownOption) => option.Id === id);

        data.Set(value ? value.Value || value.Name : undefined, id);
    }

    public OnRender(instance: Tripetto.Instance, action: Tripetto.Await): JSX.Element {
        const dropdown = this.DataAssert<string>(instance, "option");

        this.Update(dropdown, dropdown.Reference);

        return (
            <div className="form-group">
                {this.Node.Props.Name &&
                    this.Node.Props.NameVisible && (
                        <label>
                            {this.Node.Props.Name}
                            {dropdown.Slot.Required && <span className="text-danger">*</span>}
                        </label>
                    )}
                {this.Node.Props.Description && <p>{this.Node.Props.Description}</p>}
                <select
                    defaultValue={dropdown.Reference}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => this.Update(dropdown, e.target.value)}
                    className="form-control"
                >
                    {this.Node.Props.Placeholder && <option value="">{this.Node.Props.Placeholder}</option>}
                    {this.Props.Options.map((option: IDropdownOption) => (
                        <option key={option.Id} value={option.Id}>
                            {option.Name}
                        </option>
                    ))}
                </select>
                {this.Node.Props.Explanation && <span className="help-block">{this.Node.Props.Explanation}</span>}
            </div>
        );
    }

    public OnValidate(instance: Tripetto.Instance): boolean {
        const dropdown = this.DataAssert<string>(instance, "option");

        return !dropdown.Slot.Required || dropdown.Reference !== "";
    }
}
