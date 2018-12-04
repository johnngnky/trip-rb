import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Text } from "tripetto-block-text/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-text"
})
export class TextBlock extends Text implements IBlockRenderer {
    render(h: IBlockHelper): JSX.Element {
        const slot = Tripetto.assert(this.slot<Tripetto.Slots.Text>("value"));
        const value = Tripetto.assert(this.value<string>(slot));

        return (
            <div className="form-group">
                {h.name(slot.required, this.key())}
                {h.description}
                <input
                    key={this.key()}
                    id={this.key()}
                    type="text"
                    required={slot.required}
                    defaultValue={value.value}
                    placeholder={h.placeholder}
                    maxLength={slot.maxLength}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => (value.value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLInputElement>) => ((e.target as HTMLInputElement).value = value.string)}
                    className="form-control"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                />
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
