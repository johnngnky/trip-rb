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
    render(h: IBlockHelper): React.ReactNode {
        return (
            <div className="form-group">
                <div className="custom-control custom-checkbox">
                    <input
                        key={this.key()}
                        id={this.key()}
                        type="checkbox"
                        defaultChecked={this.checkboxSlot.value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            this.checkboxSlot.value = e.target.checked;
                        }}
                        className="custom-control-input"
                        aria-describedby={this.node.explanation && this.key("explanation")}
                    />
                    <label htmlFor={this.key()} className="custom-control-label">
                        {h.label(this.required)}
                    </label>
                </div>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
