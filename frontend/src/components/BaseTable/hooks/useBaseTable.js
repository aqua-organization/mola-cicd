import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

const useBaseTable = ({ initialData = [], typeTable = 1 }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize data
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const dataWithIds = initialData.map((item) => ({
        ...item,
        _id: item._id || nanoid(),
      }));
      setData(dataWithIds);
      setOriginalData(JSON.parse(JSON.stringify(dataWithIds)));
    }
  }, [initialData]);

  useEffect(() => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [data, originalData]);

  // Add new item
  const handleAddItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      _id: nanoid(),
      isNew: true,
    };
    setData((prevData) => [...prevData, itemWithId]);
  }, []);

  const handleUpdateItem = useCallback((itemId, updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.invoiceDetailId === itemId
          ? { ...item, ...updatedItem, isModified: !item.isNew }
          : item
      )
    );
  }, []);

  const handleDeleteItem = useCallback((itemId) => {
    setData((prevData) => {
      const item = prevData.find((item) => item.invoiceDetailId === itemId);
      console.log("item", item);
      if (item && item.isNew) {
        return prevData.filter((item) => item.invoiceDetailId !== itemId);
      } else {
        return prevData.map((item) =>
          item.invoiceDetailId === itemId ? { ...item, isDeleted: true } : item
        );
      }
    });
  }, []);

  const handleSaveChanges = useCallback(async () => {
    // setIsLoading(true);
    // setError(null);
    // console.log("data", data);
    // try {
    //     // Prepare data for API
    //     const newItems = data.filter((item) => item.isNew && !item.isDeleted);
    //     const modifiedItems = data.filter(
    //         (item) => item.isModified && !item.isDeleted
    //     );
    //     const deletedItems = data.filter((item) => item.isDeleted && !item.isNew);
    //     const promises = [];
    //     // Create new items
    //     if (data.length > 0) {
    //         promises.push(bulkInsertSalesInvoices({ data }));
    //     }
    // } catch (error) {
    //     setError(error);
    // } finally {
    //     setIsLoading(false);
    // }
  }, [data]);

  return {
    data,
    isLoading,
    error,
    hasUnsavedChanges,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleSaveChanges,
  };
};

export default useBaseTable;
