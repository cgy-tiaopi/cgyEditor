
//清空工具栏的公共样式
export function clearCommonClass(ele: Element,) {
    for (let value of Object.keys(ele.childNodes)){
        let el =  <Element>ele.childNodes[value];
        if(el.nodeType === 1){
            if (el.className === 'active'){
                el.className = ''
            }
        }
    } 
}