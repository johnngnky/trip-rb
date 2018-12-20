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
        return (
            <div className="form-group">
                {h.name(this.required, this.key())}
                {h.description}
                <textarea
                    key={this.key()}
                    id={this.key()}
                    rows={3}
                    required={this.required}
                    defaultValue={this.textareaSlot.value}
                    placeholder={h.placeholder}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                        this.textareaSlot.value = e.target.value;
                    }}
                    onFocus={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                        e.target.classList.remove("is-invalid");
                    }}
                    onBlur={(e: React.FocusEvent<HTMLTextAreaElement>) => {
                        e.target.value = this.textareaSlot.string;
                        e.target.classList.toggle("is-invalid", this.isFailed);
                    }}
                    className="form-control"
                    aria-describedby={this.node.explanation && this.key("explanation")}
                />
                {h.explanation(this.key("explanation"))}
            </div>
        );
    }
}
