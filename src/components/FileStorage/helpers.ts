import { StorageItem } from "../../types";

export const add = (
  items: StorageItem[],
  parentId: string,
  itemToAdd: StorageItem
): StorageItem[] => {
  return items.map((item) => {
    if (item.id === parentId) {
      return {
        ...item,
        children: [
          ...(item.children || []),
          {
            ...itemToAdd,
            path: [...(item?.path || []), item.id],
          },
        ],
      };
    }

    if (Array.isArray(item.children)) {
      return {
        ...item,
        children: [...add(item.children, parentId, itemToAdd)],
      };
    }

    return item;
  });
};

export const edit = (
  items: StorageItem[],
  editId: string,
  patch: Partial<StorageItem>
): StorageItem[] => {
  return items.map((item) => {
    if (item.id === editId) {
      return { ...item, ...patch };
    }

    if (Array.isArray(item.children)) {
      return { ...item, children: [...edit(item.children, editId, patch)] };
    }

    return item;
  });
};

export const remove = (
  items: StorageItem[],
  removeId: string
): StorageItem[] => {
  return items.reduce<StorageItem[]>((prev, curr) => {
    if (curr.id === removeId) {
      return prev;
    }
    if (Array.isArray(curr.children)) {
      return [...prev, { ...curr, children: remove(curr.children, removeId) }];
    }

    return [...prev, curr];
  }, []);
};
