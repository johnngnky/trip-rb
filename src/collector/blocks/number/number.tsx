import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Number } from "tripetto-block-number/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-number"
})
export class NumberBlock extends Number implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        const slot = Tripetto.assert(this.slot<Tripetto.Slots.Numeric>("number"));
        const value = Tripetto.assert(this.value<number>(slot));

        return (
            <div className="form-group">
                {h.name(slot.required, this.key())}
                {h.description}
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">#</span>
                    </div>
                    <input
                        key={this.key()}
                        id={this.key()}
                        type="text"
                        required={slot.required}
                        defaultValue={value.hasValue ? value.string : undefined}
                        placeholder={h.placeholder}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            value.pristine = e.target.value !== "" ? e.target.value : undefined;
                        }}
                        onFocus={(e: React.FocusEvent<HTMLInputElement>) => {
                            const input = e.target as HTMLInputElement;

                            // Switch to number type when focus is gained.
                            input.value = `${value.value}`;
                            input.type = "number";
                            input.step = (slot.precision && `0.${Tripetto.Str.fill("0", slot.precision - 1)}1`) || "1";

                            if (!value.hasValue) {
                                value.pristine = 0;
                            }
                        }}
                        onBlur={(e: React.FocusEvent<HTMLInputElement>) => {
                            const input = e.target as HTMLInputElement;

                            // Switch to text type to allow number prefix and suffix.
                            input.type = "text";
                            input.value = value.hasValue ? value.string : "";
                        }}
                        className="form-control"
                        aria-describedby={this.node.explanation && this.key("explanation")}
                    />
                </div>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
