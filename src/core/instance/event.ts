import WspEditor from ".";

const inputRE = /<input class="img-des-input" placeholder="图片描述\(最多50字\)" maxlength="50">/g
const spanRE = /<span class="img-des"><\/span>/g

interface WspEditorConstructor {
    new (options: any): WspEditor
}

export function eventMixin(WspEditor: WspEditorConstructor) {
    WspEditor.prototype.getHtml = function() {
        let self = this,
            html = self.$contentArea.innerHTML;
        return html.replace(inputRE, '').replace(spanRE, '');
    };

    WspEditor.prototype.setHtml = function(html: string) {
        let self = this;
    }
}