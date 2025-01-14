import { computed, ref, toRefs, watchEffect } from 'vue';
import { FieldNames, TreeNodeData, Node, LoadMore } from '../interface';
import { getFlattenTreeData, getKey2TreeNode } from '../utils';
import { generateTreeData } from '../utils/tree-data';

export default function useTreeData(props: {
  treeData: TreeNodeData[];
  fieldNames?: FieldNames;
  selectable?: boolean;
  showLine?: boolean;
  blockNode?: boolean;
  checkable?: boolean;
  loadMore?: LoadMore;
  draggable?: boolean;
}) {
  const {
    treeData: propTreeData,
    fieldNames,
    selectable,
    showLine,
    blockNode,
    checkable,
    loadMore,
    draggable,
  } = toRefs(props);

  const treeData = ref<Node[]>([]);

  watchEffect(() => {
    treeData.value = generateTreeData(propTreeData.value || [], {
      selectable: !!selectable?.value,
      showLine: !!showLine?.value,
      blockNode: !!blockNode?.value,
      checkable: !!checkable?.value,
      fieldNames: fieldNames?.value,
      loadMore: !!loadMore?.value,
      draggable: !!draggable?.value,
    });
  });

  const flattenTreeData = computed(() => getFlattenTreeData(treeData.value));
  const key2TreeNode = computed(() => getKey2TreeNode(flattenTreeData.value));

  return { treeData, flattenTreeData, key2TreeNode };
}
