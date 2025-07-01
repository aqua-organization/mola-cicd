import { useState, useCallback, useRef, useEffect } from "react";

const useInfiniteScroll = ({
  fetchData,
  pageSize = 10,
  initialData = [],
  hasNextPage: externalHasNextPage = null,
  dataKey = "users",
}) => {
  const [data, setData] = useState(initialData);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const pageRef = useRef(1);
  const isLoadingRef = useRef(false);

  const fetchPage = useCallback(
    async (page, isRefresh = false) => {
      if (isLoadingRef.current) return;

      isLoadingRef.current = true;
      setLoading(true);
      setError(null);

      try {
        const result = await fetchData({
          page,
          limit: pageSize,
        });

        const data = result.data[dataKey];

        if (result && result.data) {
          setData((prevData) => {
            if (isRefresh || page === 1) {
              return data;
            }

            return [...prevData, ...data];
          });

          const hasMore = externalHasNextPage
            ? externalHasNextPage(result)
            : data.length === pageSize;

          setHasNextPage(hasMore);
          pageRef.current = page + 1;
        } else {
          setHasNextPage(false);
        }
      } catch (err) {
        setHasNextPage(false);
        setError(err.message || "Có lỗi xảy ra khi tải dữ liệu");
        console.error("Infinite scroll error:", err);
      } finally {
        setLoading(false);
        setInitialLoading(false);
        isLoadingRef.current = false;
      }
    },
    [fetchData, pageSize, externalHasNextPage]
  );

  const loadMore = useCallback(async () => {
    if (!hasNextPage) return;
    await fetchPage(pageRef.current);
  }, [hasNextPage, fetchPage]);

  const refresh = useCallback(() => {
    setData([]);
    setError(null);
    setHasNextPage(true);
    pageRef.current = 1;
    isLoadingRef.current = false;
    setRefreshKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    fetchPage(1, true);
  }, [refreshKey, fetchPage]);

  return {
    data,
    initialLoading,
    loading,
    hasNextPage,
    error,
    loadMore,
    refresh,
    page: pageRef.current - 1,
  };
};

export default useInfiniteScroll;
