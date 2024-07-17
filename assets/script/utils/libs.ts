import { Node } from 'cc';

/**
 * 获取节点下的所有子节点
 * @param node
 */
export function findAllNodes(node: Node): Node[] {
  let nodes: Node[] = [];
  function traverse(currentNode: Node) {
    nodes.push(currentNode); // 将当前节点添加到数组中
    currentNode.children.forEach(child => {
      traverse(child); // 递归遍历子节点
    });
  }
  traverse(node); // 从当前节点开始遍历
  return nodes;
}

/**
 * 字符串转base64
 * @param str 字符串
 */
export function base64EncodeUnicode(str: string) {
	return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_match, p1) => String.fromCharCode(parseInt(p1, 16))));
}