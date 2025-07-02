import { useState, useEffect, useCallback } from "react";
import { nanoid } from "nanoid";

const useBaseTable = ({ initialData = [] }) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

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
        item._id === itemId
          ? { ...item, ...updatedItem, isModified: !item.isNew }
          : item
      )
    );
  }, []);

  const handleDeleteItem = useCallback((itemId) => {
    setData((prevData) => {
      const item = prevData.find((item) => item._id === itemId);
      if (item && item.isNew) {
        return prevData.filter((item) => item._id !== itemId);
      } else {
        return prevData.map((item) =>
          item._id === itemId ? { ...item, isDeleted: true } : item
        );
      }
    });
  }, []);

  const handleSaveChanges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log("data", data);
    try {
      const newItems = data.filter((item) => item.isNew && !item.isDeleted);
      const modifiedItems = data.filter(
        (item) => item.isModified && !item.isDeleted
      );
      const deletedItems = data.filter((item) => item.isDeleted && !item.isNew);
      if (newItems.length > 0) {
        console.log("newItems", newItems);
      }
      if (modifiedItems.length > 0) {
        console.log("modifiedItems", modifiedItems);
      }
      if (deletedItems.length > 0) {
        console.log("deletedItems", deletedItems);
      }
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
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
