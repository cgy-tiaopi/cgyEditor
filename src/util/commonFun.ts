
//清空工具栏的公共样式
export function clearCommonClass(ele) {
    // let parentNode = ele.parentNode;
    for(let value  of ele.childNodes){
        if(value.className ==='active'){
            value.className='';
        }
    }
}