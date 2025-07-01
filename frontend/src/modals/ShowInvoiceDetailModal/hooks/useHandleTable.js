import { useState, useCallback, useEffect } from "react";
// import {
//   bulkInsertSalesInvoices,
//   bulkUpdateSalesInvoiceDetail,
// } from "../../../services/invoiceService";
import * as XLSX from "xlsx";

export const useHandleTable = (initialData = []) => {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Initialize data
  useEffect(() => {
    if (initialData && initialData.length > 0) {
      const dataWithIds = initialData.map((item, index) => ({
        ...item,
        invoiceDetailId: item.invoiceDetailId || `temp_${Date.now()}_${index}`,
      }));
      setData(dataWithIds);
      setOriginalData(JSON.parse(JSON.stringify(dataWithIds)));
    }
  }, [initialData]);

  // Check for unsaved changes
  useEffect(() => {
    const hasChanges = JSON.stringify(data) !== JSON.stringify(originalData);
    setHasUnsavedChanges(hasChanges);
  }, [data, originalData]);

  // Add new item
  const handleAddItem = useCallback((newItem) => {
    const itemWithId = {
      ...newItem,
      id: `new_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      isNew: true,
    };
    setData((prevData) => [...prevData, itemWithId]);
  }, []);

  // Update existing item
  const handleUpdateItem = useCallback((itemId, updatedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.invoiceDetailId === itemId
          ? { ...item, ...updatedItem, isModified: !item.isNew }
          : item
      )
    );
  }, []);

  // Delete item
  const handleDeleteItem = useCallback((itemId) => {
    setData((prevData) => {
      const item = prevData.find((item) => item.invoiceDetailId === itemId);
      console.log("item", item);
      if (item && item.isNew) {
        // Remove new items immediately
        return prevData.filter((item) => item.invoiceDetailId !== itemId);
      } else {
        // Mark existing items as deleted
        return prevData.map((item) =>
          item.invoiceDetailId === itemId ? { ...item, isDeleted: true } : item
        );
      }
    });
  }, []);

  const handleDeleteItemDetail = useCallback((itemId) => {
    setData((prevData) => {
      const item = prevData.find((item) => item.invoiceDetailId === itemId);
      if (item) {
        // Remove new items immediately
        return prevData.filter((item) => item.invoiceDetailId !== itemId);
      } else {
        // Mark existing items as deleted
        return prevData.map((item) =>
          item.invoiceDetailId === itemId ? { ...item, isDeleted: true } : item
        );
      }
    });
  }, []);

  // Import from Excel
  const handleImportExcel = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".xlsx,.xls";

    input.onchange = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      setIsLoading(true);
      setError(null);

      try {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const workbook = XLSX.read(e.target.result, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            console.log(`Found ${jsonData.length} rows in Excel file`);
            console.log("First row sample:", jsonData[0]);
            console.log("Available columns:", Object.keys(jsonData[0] || {}));

            if (jsonData.length === 0) {
              throw new Error("File Excel trống hoặc không có dữ liệu");
            }

            // Transform Excel data to match our format
            const transformedData = jsonData.map((row, index) => ({
              id: `import_${Date.now()}_${index}`,
              invoiceIssuanceDate:
                row["Ngày lập hóa đơn"] || row["Invoice Issuance Date"] || "",
              invoiceFormNumber:
                row["Mẫu số HD"] || row["Invoice Form Number"] || "",
              invoiceSeries:
                row["Ký hiệu hóa  đơn"] || row["Invoice Series"] || "",
              invoiceNumber: row["Số hóa đơn"] || row["Invoice Number"] || "",
              sellerName: row["Tên người bán"] || row["Seller Name"] || "",
              sellerTaxCode:
                row["MST người bán"] || row["Seller Tax Code"] || "",
              buyerName: row["Tên người mua"] || row["Buyer Name"] || "",
              buyerTaxCode: row["MST người mua"] || row["Buyer Tax Code"] || "",
              description:
                row["Tên hàng hóa, dịch vụ"] || row["Description"] || "",
              totalPayment:
                row["Tổng tiền thanh toán"] || row["Total Payment"] || "",
              vatAmount: row["Tiền thuế"] || row["VAT Amount"] || "",
              invoiceStatus:
                row["Trạng thái hóa đơn"] || row["Invoice Status"] || "Đã ký",
              paymentMethod:
                row["Hình thức thanh toán"] || row["Payment Method"] || "",
              customerCode: row["Mã khách hàng"] || row["Customer Code"] || "",
              providerCode:
                row["Mã nhà cung cấp"] || row["Provider Code"] || "",
              invoiceLookupCode:
                row["Mã tra cứu"] || row["Invoice Lookup Code"] || "",
              invoiceLookupUrl:
                row["Link tra cứu"] || row["Invoice Lookup URL"] || "",

              // Bổ sung thêm một số trường nếu cần thiết
              exchangeRate: row["Tỷ giá"] || row["Exchange Rate"] || 1,
              quantity: row["Số lượng"] || row["Quantity"] || "",
              unitPrice: row["Đơn giá"] || row["Unit Price"] || "",
              amountBeforeVAT:
                row["Thành tiền chưa thuế"] || row["Amount Before VAT"] || "",
              vatRate: row["Thuế suất"] || row["VAT Rate"] || "",
              unit: row["Đơn vị tính"] || row["Unit"] || "",
              currency: row["Đơn vị tiền tệ"] || row["Currency"] || "",
              sellerAddress:
                row["Địa chỉ người bán"] || row["Seller Address"] || "",
              buyerAddress:
                row["Địa chỉ người mua"] || row["Buyer Address"] || "",
              type: row["Tính chất"] || row["Loại"] || "",
              discount: row["Chiết khấu"] || row["Discount"] || "",
              totalDiscount:
                row["Tổng tiền CKTM"] || row["Total Discount"] || "",
              isNew: true,
              isImported: true,
            }));

            setData((prevData) => [...prevData, ...transformedData]);

            // Success notification
            const successMessage = `✅ Import thành công ${transformedData.length} bản ghi từ file Excel!`;
            console.log(successMessage);

            // Show success toast or alert
            if (window.confirm) {
              window.alert(successMessage);
            }
          } catch (parseError) {
            setError("Lỗi đọc file Excel. Vui lòng kiểm tra định dạng file.");
            console.error("Excel parse error:", parseError);
          } finally {
            setIsLoading(false);
          }
        };
        reader.readAsBinaryString(file);
      } catch (err) {
        setError("Lỗi import file Excel");
        console.error("Import error:", err);
        setIsLoading(false);
      }
    };

    input.click();
  }, []);

  // Export to Excel
  const handleExportExcel = useCallback(() => {
    try {
      setIsLoading(true);

      // Filter out deleted items and prepare data for export
      const exportData = data
        .filter((item) => !item.isDeleted)
        .map((item) => ({
          // STT: "",
          "Ngày lập hóa đơn": item.invoiceIssuanceDate || "",
          "Mẫu số hóa đơn": item.invoiceFormNumber || "",
          "Ký hiệu hóa đơn": item.invoiceSeries || "",
          "Số hóa đơn": item.invoiceNumber || "",
          "MST người bán": item.sellerTaxCode || "",
          "Tên người bán": item.sellerName || "",
          "Địa chỉ người bán": item.sellerAddress || "",
          "Mã vật tư": item.itemCode || "",
          "Tên hàng hóa, dịch vụ": item.description || "",
          "Đơn vị tính": item.unit || "",
          "Đơn vị tiền tệ": item.currency || "VND",
          "Tỷ giá": item.exchangeRate || "1",
          "Số lượng": item.quantity || "",
          "Đơn giá": item.unitPrice || "",
          "Thành tiền chưa thuế": item.amountBeforeVAT || "",
          "Thuế suất": item.vatRate || "",
          "Tiền thuế": item.vatAmount || "",
          "Chiết khấu": item.discount || "",
          "Tổng tiền CKTM": item.totalDiscount || "",
          "Tổng tiền phí": item.totalFee || "",
          "Tổng tiền thanh toán": item.totalPayment || "",
          "MST người mua": item.buyerTaxCode || "",
          "Tên người mua": item.buyerName || "",
          "Địa chỉ người mua": item.buyerAddress || "",
          "Trạng thái hóa đơn": item.invoiceStatus || "",
          "KQ Kiểm tra trạng thái HĐ": item.invoiceVerificationResult || "",
          "Hình thức thanh toán": item.paymentMethod || "",
          "Tài khoản nợ": item.debtAccount || "",
          "Tài khoản có": item.creditAccount || "",
          Loại: item.type || "",
          "Mã khách hàng": item.customerCode || "",
          "Mã nhà cung cấp": item.providerCode || "",
          "Mã tra cứu": item.invoiceLookupCode || "",
          "Link tra cứu": item.invoiceLookupUrl || "",
        }));

      // Add STT (Sequential number)
      // exportData.forEach((item, index) => {
      //   item["STT"] = index + 1;
      // });

      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Dữ liệu hóa đơn");

      // Generate filename with timestamp
      const timestamp = new Date()
        .toISOString()
        .replace(/[:.]/g, "-")
        .slice(0, 19);
      const filename = `invoice_data_${timestamp}.xlsx`;

      XLSX.writeFile(workbook, filename);
      console.log(`Exported ${exportData.length} records to ${filename}`);
    } catch (err) {
      setError("Lỗi xuất file Excel");
      console.error("Export error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  // Save changes
  const handleSaveChanges = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    console.log("data", data);
    try {
      // Prepare data for API
      // const newItems = data.filter((item) => item.isNew && !item.isDeleted);
      const modifiedItems = data.filter(
        (item) => item.isModified && !item.isDeleted
      );
      const deletedItems = data.filter((item) => item.isDeleted && !item.isNew);

      // Simulate API calls (replace with actual API endpoints)
      const promises = [];

      // Create new items
      if (data.length > 0) {
        // promises.push(bulkInsertSalesInvoices({ data }));
      }

      // Update modified items
      if (modifiedItems.length > 0) {
        // promises.push(bulkUpdateSalesInvoiceDetail({ data: modifiedItems }));
      }

      // Delete items
      if (deletedItems.length > 0) {
        const deleteIds = deletedItems.map((item) => item);
        console.log("deleteIds", deleteIds);

        // promises.push(invoiceApi.deleteInvoices(deleteIds));
      }

      if (promises.length > 0) {
        await Promise.all(promises);
      }

      // Update local state
      const savedData = data
        .filter((item) => !item.isDeleted)
        .map((item) => ({
          ...item,
          isNew: false,
          isModified: false,
          isImported: false,
        }));

      setData(savedData);
      setOriginalData(JSON.parse(JSON.stringify(savedData)));
      setHasUnsavedChanges(false);

      console.log("Changes saved successfully");
    } catch (err) {
      const errorMessage = err.message || "Lỗi khi lưu dữ liệu";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [data]);

  const resetError = useCallback(() => {
    setError(null);
  }, []);

  const handleSave = useCallback(() => {
    console.log("data", data);
  }, [data]);

  return {
    data: data.filter((item) => !item.isDeleted), // Hide deleted items
    isLoading,
    error,
    hasUnsavedChanges,
    handleAddItem,
    handleUpdateItem,
    handleDeleteItem,
    handleDeleteItemDetail,
    handleImportExcel,
    handleExportExcel,
    handleSaveChanges,
    resetError,
    handleSave,
  };
};
