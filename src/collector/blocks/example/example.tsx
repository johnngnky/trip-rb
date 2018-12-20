import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "example"
})
export class TextBlock extends Tripetto.NodeBlock implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        const exampleSlot = Tripetto.assert(this.slot("example-slot"));
        const exampleValue = Tripetto.assert(this.value<string>(exampleSlot));

        return (
            <div className="form-group">
                {h.name(exampleSlot.required, this.key())}
                {h.description}
                <div
                    onClick={() => exampleValue.set("A nice value!")}
                    style={{
                        color: "red"
                    }}
                >
                    This is an example block with an example data slot that can be set. If the block is required, the validation will pass
                    as soon as the value is set.
                    <br />
                    Current value of example slot: <b>{exampleValue.string || "Not set"}</b> (click here to set a value)
                </div>
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }

    @Tripetto.validator
    validate(): boolean {
        const exampleSlot = this.slot("example-slot");

        if (!exampleSlot) {
            return false;
        }

        if (exampleSlot.required) {
            const exampleValue = this.value(exampleSlot);

            return (exampleValue && exampleValue.hasValue) || false;
        }

        return true;
    }
}
