# Get E-Invoice Modal

Modal lấy dữ liệu hóa đơn điện tử với date range picker và select type.

## Cách sử dụng

### 1. Import và sử dụng Modal component

```jsx
import React, { useState } from "react";
import GetEInvoiceModal from "./modals/GetEInvoiceModal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetInvoicesSuccess = (invoiceData) => {
    console.log("Lấy dữ liệu thành công:", invoiceData);
    // Xử lý logic sau khi lấy dữ liệu thành công
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>Lấy dữ liệu hóa đơn</button>

      <GetEInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleGetInvoicesSuccess}
      />
    </div>
  );
}
```

### 2. Sử dụng Custom Hook (Advanced)

```jsx
import React from "react";
import { useGetEInvoiceModal } from "./modals/GetEInvoiceModal";
import GetEInvoiceModal from "./modals/GetEInvoiceModal";

function MyComponent() {
  const {
    isOpen,
    isLoading,
    error,
    openModal,
    closeModal,
    handleGetInvoices,
    resetError,
  } = useGetEInvoiceModal();

  const handleCustomGetInvoices = async (formData) => {
    try {
      const result = await handleGetInvoices(formData);
      console.log("Get invoices result:", result);
    } catch (err) {
      console.error("Get invoices failed:", err);
    }
  };

  return (
    <div>
      <button onClick={openModal}>Mở Modal Lấy Dữ Liệu</button>

      {error && (
        <div className="error">
          {error}
          <button onClick={resetError}>Đóng</button>
        </div>
      )}

      <GetEInvoiceModal
        isOpen={isOpen}
        onClose={closeModal}
        onSuccess={(data) => console.log("Success:", data)}
      />
    </div>
  );
}
```

## Props

### GetEInvoiceModal

| Prop        | Type     | Required | Description                         |
| ----------- | -------- | -------- | ----------------------------------- |
| `isOpen`    | boolean  | ✅       | Trạng thái hiển thị modal           |
| `onClose`   | function | ✅       | Callback khi đóng modal             |
| `onSuccess` | function | ❌       | Callback khi lấy dữ liệu thành công |

### useGetEInvoiceModal Hook

Trả về object với các thuộc tính:

| Property            | Type           | Description               |
| ------------------- | -------------- | ------------------------- |
| `isOpen`            | boolean        | Trạng thái modal          |
| `isLoading`         | boolean        | Trạng thái đang xử lý     |
| `error`             | string \| null | Thông báo lỗi             |
| `openModal`         | function       | Mở modal                  |
| `closeModal`        | function       | Đóng modal                |
| `handleGetInvoices` | function       | Xử lý lấy dữ liệu hóa đơn |
| `resetError`        | function       | Xóa lỗi                   |

## Form Fields

### Loại hóa đơn (type)

- **1**: Hóa đơn bán ra
- **2**: Hóa đơn mua vào

### Date Range

- **Từ ngày**: Ngày bắt đầu (không được là ngày tương lai)
- **Đến ngày**: Ngày kết thúc (phải sau ngày bắt đầu)
- **Giới hạn**: Tối đa 30 ngày

## Form Validation

- **Loại hóa đơn**: Bắt buộc chọn
- **Từ ngày**: Bắt buộc, không được chọn ngày tương lai
- **Đến ngày**: Bắt buộc, phải sau ngày bắt đầu, không quá 30 ngày

## API Integration

### Cấu trúc API cần thiết:

#### API (`invoiceApi.getInvoices(payload)`)

Nhận payload:

```javascript
{
  type: 1,                      // 1: Bán ra, 2: Mua vào
  process_type: "chitiet",      // Fixed value
  date_range: {
    start: "02/04/2025",        // DD/MM/YYYY format
    end: "06/04/2025"           // DD/MM/YYYY format
  }
}
```

### Workflow tự động:

1. User chọn type và date range
2. Form validation
3. Tự động format date theo DD/MM/YYYY
4. Submit → Gọi API với payload chuẩn
5. Success → Gọi onSuccess callback

### Files đã tích hợp API:

- ✅ `hooks/useGetEInvoiceModal.js` - Gọi `invoiceApi.getInvoices()`
- ✅ Auto-format: date picker → DD/MM/YYYY
- ✅ Auto-flow: form data → API payload
