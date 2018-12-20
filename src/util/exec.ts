export function execCommand(name: string, value?: any) {
    let flg = document.queryCommandEnabled(name);
    if (flg) {
        let s = document.execCommand(name, false, value);
        if (!s) {
            console.error(name + '--指令执行失败');
        }
    } else {
        console.error(name + '--指令不可用');
    }
}