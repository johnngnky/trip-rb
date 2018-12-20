import * as React from "react";
import * as Tripetto from "tripetto-collector";
import { Textarea } from "tripetto-block-textarea/collector";
import { IBlockRenderer } from "../../helpers/interfaces/renderer";
import { IBlockHelper } from "../../helpers/interfaces/helper";

@Tripetto.block({
    type: "node",
    identifier: "tripetto-block-textarea"
})
export class TextareaBlock extends Textarea implements IBlockRenderer {
    render(h: IBlockHelper): React.ReactNode {
        const slot = Tripetto.assert(this.slot("value"));
        const value = Tripetto.assert(this.value<string>(slot));

        return (
            <div className="form-group">
                {h.name(slot.required, this.key())}
                {h.description}
                <textarea
                    key={this.key()}
                    id={this.key()}
                    rows={3}
                    required={slot.required}
                    defaultValue={value.value}
                    placeholder={h.placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => (value.value = e.target.value)}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => ((e.target as HTMLTextAreaElement).value = value.string)}
                    className="form-control"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                />
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
