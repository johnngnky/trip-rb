import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Checkbox } from "tripetto-block-checkbox/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-checkbox"
})
export class CheckboxBlock extends Checkbox implements IBlockRenderer {
    render(h: IBlockHelper): JSX.Element {
        const slot = Tripetto.assert(this.slot("checked"));
        const checked = Tripetto.assert(this.value<boolean>(slot));

        checked.confirm();

        return (
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input
                        key={this.key()}
                        id={this.key()}
                        type="checkbox"
                        defaultChecked={checked.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => (checked.value = e.target.checked)}
                        className="custom-control-input"
                        aria-describedby={this.node.explanation && this.key("explanation")}
                    />
                    <label htmlFor={this.key()} className="custom-control-label">
                        {h.label(slot.required)}
                    </label>
                </div>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
