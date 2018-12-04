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
    render(h: IBlockHelper): JSX.Element {
        return (
            <div className="form-group">
                {h.name()}
                {h.description}
                {this.props.checkboxes.map((checkbox: ICheckbox) => {
                    const checked = Tripetto.assert(this.value<boolean>(checkbox.id));

                    checked.confirm();

                    return (
                        checkbox.name && (
                            <div key={this.key(checkbox.id)} className="custom-control custom-checkbox">
                                <input
                                    key={checked.key}
                                    id={checked.key}
                                    type="checkbox"
                                    defaultChecked={checked.value}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (checked.value = e.target.checked)}
                                    className="custom-control-input"
                                    aria-describedby={this.node.explanation && this.key("explanation")}
                                />
                                <label htmlFor={checked.key} className="custom-control-label">
                                    {checkbox.name}
                                </label>
                            </div>
                        )
                    );
                })}
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
