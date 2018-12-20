import WspEditor from ".";

const inputRE = /<input class="img-des-input" placeholder="图片描述\(最多50字\)" maxlength="50">/g
const emptySpanRE = /<span class="img-des" style="display: none"><\/span>/g
const noneRE = /display: none/g
const positionRelativeRE = /positionRelative/g

interface WspEditorConstructor {
    new (options: any): WspEditor
}

export function eventMixin(WspEditor: WspEditorConstructor) {
    WspEditor.prototype.getHtml = function() {
        let self = this,
            html = self.$contentArea.innerHTML;
            
        return html.replace(inputRE, '')
                    .replace(emptySpanRE, '')
                    .replace(noneRE, 'width: 100%; position: absolute; bottom: 5px; left: 0; width: 100%; background-color: rgba(0, 0, 0, 0.3);')
                    .replace(positionRelativeRE, 'position: relative');
    };

    WspEditor.prototype.setHtml = function(html: string) {
        let self = this;
    }
}