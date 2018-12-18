
export function execCommand(name: string, value?: any) {
    let s =  document.execCommand(name, false, value);
    if(!s){
        console.error(name+'--指令执行失败');
    }
}