import { ITreeNode } from "@/schema/OrganogramSchema";

export function buildGraph(tree: ITreeNode[]) {
  const hash = new Map<Number, Number>();

  if (tree.length < 1) return hash;
  const stk: ITreeNode[] = [];

  console.log("Current tree", tree);

  stk.push(tree[0]);
  hash.set(tree[0].data.employee_id, -1); // The root

  while (true) {
    console.log(
      "Current Stack",
      stk.map((item) => item.data.employee_id)
    );

    console.log("Current Hash", hash);

    if (stk.length < 1) break;

    const top = stk.pop();
    // Set the parent of the current node
    if (top?.data.parent)
      hash.set(top.data.employee_id, top.data.parent.data.employee_id);

    top?.children?.forEach((node) => stk.push(node));
  }

  return hash;
}
