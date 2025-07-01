import { useState } from "react";

const useSelected = ({ data, idKey = "_id" }) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectItem = (id) => {
    const newSelectedItems = new Set(selectedItems);
    if (newSelectedItems.has(id)) {
      newSelectedItems.delete(id);
    } else {
      newSelectedItems.add(id);
    }
    setSelectedItems(newSelectedItems);
    setSelectAll(newSelectedItems.size === data.length);
  };

  // const isIndeterminate = useMemo(() => {
  //   return selectedItems.size > 0 && selectedItems.size < data.length;
  // }, [selectedItems, data]);

  const handleSelectAll = (cancel = false) => {
    console.log("handleSelectAll", cancel);
    if (selectAll || cancel) {
      setSelectedItems(new Set());
      setSelectAll(false);
    } else {
      const allIds = new Set(data.map((item) => item[idKey]));
      setSelectedItems(allIds);
      setSelectAll(true);
    }
  };

  return {
    selectedItems,
    selectAll,
    // isIndeterminate,
    handleSelectItem,
    handleSelectAll,
  };
};

export default useSelected;
