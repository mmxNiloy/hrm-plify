import { ITreeNode } from "@/schema/OrganogramSchema";

export function removeCycle(node: ITreeNode | undefined) {
  if (node === undefined) return undefined;
  const newNode = { ...node };
  newNode.data.selfRef = undefined;
  newNode.data.parent = undefined;

  if (newNode.children) {
    for (let i = 0; i < newNode.children.length; i++) {
      const newChild = removeCycle(newNode.children[i]);
      if (newChild) newNode.children[i] = newChild;
    }
  }

  return newNode;
}

export function buildGraph(tree: ITreeNode[]) {
  var newRoot: ITreeNode | undefined = removeCycle(tree[0]);

  console.log("After Making the graph acyclic", newRoot);

  return newRoot;
}

export function introduceCycle(
  node: ITreeNode | undefined,
  parent: ITreeNode | undefined
) {
  if (node === undefined) return undefined;

  const newNode: ITreeNode = { ...node };
  newNode.data.selfRef = newNode;
  if (parent) {
    newNode.data.parent = parent;
  }

  if (newNode.children) {
    for (let i = 0; i < newNode.children.length; i++) {
      const newChild = introduceCycle(newNode.children[i], newNode);
      if (newChild) newNode.children[i] = newChild;
    }
  }

  return newNode;
}

export function findNodeIds(node: ITreeNode | undefined, storage: number[]) {
  if (node) {
    storage.push(node.data.employee_id);
    node.children?.forEach((item) => findNodeIds(item, storage));
  }
}

export function rebuildGraph(tree: ITreeNode) {
  console.log("Graph stored >", tree);
  var newRoot = introduceCycle(tree, undefined);

  if (!newRoot)
    return {
      graph: [],
      nodes: [],
    };

  console.log("After making the stored graph cyclic", newRoot);

  const nodeIds: number[] = [];
  findNodeIds(newRoot, nodeIds);

  return { graph: [newRoot], nodes: nodeIds };
}
