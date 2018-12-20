import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Dropdown, IDropdownOption } from "tripetto-block-dropdown/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-dropdown"
})
export class DropdownBlock extends Dropdown implements IBlockRenderer {
    private set(dropdown: Tripetto.Value<string>, id: string | undefined): void {
        let selectedOption = Tripetto.findFirst(this.props.options, (option: IDropdownOption) => option.id === id);

        if (!selectedOption && !this.node.placeholder) {
            selectedOption = Tripetto.arrayItem(this.props.options, 0);
        }

        if (selectedOption) {
            dropdown.set(selectedOption.value || selectedOption.name, selectedOption.id);
        } else {
            dropdown.set(undefined, "");
        }
    }

    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name(this.required, this.key())}
                {h.description}
                <select
                    key={this.key()}
                    id={this.key()}
                    defaultValue={this.value}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        this.value = e.target.value;
                    }}
                    onFocus={(e: React.FocusEvent<HTMLSelectElement>) => {
                        e.target.classList.remove("is-invalid");
                    }}
                    onBlur={(e: React.FocusEvent<HTMLSelectElement>) => {
                        e.target.classList.toggle("is-invalid", this.isFailed);
                    }}
                    className="custom-select"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                >
                    {h.placeholder && <option value="">{h.placeholder}</option>}
                    {this.props.options.map(
                        (option: IDropdownOption) =>
                            option.name && (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            )
                    )}
                </select>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
