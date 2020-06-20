export function treeToList(tree){
    let resultArr = [];
    let tepArr = [];
    tepArr = tepArr.concat(JSON.parse(JSON.stringify(tree)))
    while(tepArr.length){
        var node = tepArr.shift();  // 去除数组首部的第一个元素
        if(node.children){
          tepArr = tepArr.concat(node.children)
          delete node['children']
        }else{
            resultArr.push(node.id)
        }
    }
    return resultArr
}