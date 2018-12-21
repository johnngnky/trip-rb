import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Checkboxes, ICheckbox } from "tripetto-block-checkboxes/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-checkboxes"
})
export class CheckboxesBlock extends Checkboxes implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                {h.name()}
                {h.description}
                {this.props.checkboxes.map((checkbox: ICheckbox) => {
                    const checkboxSlot = this.checkboxSlot(checkbox);

                    return (
                        <div key={checkboxSlot.key} className="custom-control custom-checkbox">
                            <input
                                key={checkboxSlot.key}
                                id={checkboxSlot.key}
                                type="checkbox"
                                defaultChecked={checkboxSlot.value}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    checkboxSlot.value = e.target.checked;
                                }}
                                className="custom-control-input"
                                aria-describedby={this.node.explanation && this.key("explanation")}
                            />
                            <label htmlFor={checkboxSlot.key} className="custom-control-label">
                                {checkbox.name || "..."}
                            </label>
                        </div>
                    );
                })}
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
