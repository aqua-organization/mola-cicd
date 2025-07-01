# SetDefaultValueModal

Modal thiết lập giá trị mặc định cho nhiều trường với giao diện tab và quản lý dữ liệu linh hoạt.

## Tính năng

- **Giao diện Tab**: Chuyển đổi giữa các trường khác nhau
- **Quản lý nhiều Field**: Hỗ trợ thiết lập giá trị cho nhiều trường cùng lúc
- **Table Interface**: Hiển thị dữ liệu dạng bảng với cột Giá trị và Nhãn
- **Inline Editing**: Chỉnh sửa giá trị trực tiếp trong bảng
- **CRUD Operations**: Thêm, sửa, xóa giá trị cho từng field
- **Selection Management**: Chọn giá trị cho nhiều field và hiển thị tổng kết
- **Responsive Design**: Tương thích với mobile và desktop
- **CSS Isolation**: Sử dụng tiền tố `set-default-value-` để tránh xung đột
- **Chọn giá trị từ danh sách**: Click vào các hàng trong bảng để chọn giá trị mặc định (chỉ khi field có values)
- **Chỉnh sửa inline**: Sửa giá trị và nhãn trực tiếp trong bảng (hiện tại đã ẩn)
- **Thêm mới**: Thêm giá trị mới vào danh sách (hiện tại đã ẩn)
- **Xóa**: Xóa giá trị khỏi danh sách (hiện tại đã ẩn)
- **Nhập liệu tùy chỉnh**: Nhập giá trị tùy chỉnh cho bất kỳ trường nào
- **Hỗ trợ field không có values**: Tự động ẩn bảng và chỉ hiển thị phần nhập liệu
- **Tabs**: Chuyển đổi giữa các trường khác nhau
- **Responsive**: Hỗ trợ scroll ngang cho tabs và scroll dọc cho bảng
- **Tùy chỉnh**: Nhận cấu hình trường và giá trị đã chọn qua props

## Cấu trúc dữ liệu

Modal sử dụng cấu trúc dữ liệu linh hoạt cho nhiều field:

```javascript
const fieldConfigs = {
  documentType: {
    label: "Loại chứng từ",
    values: [
      {
        id: 1,
        value: "MHNK - tiền mặt",
        label: "MHNK - tiền mặt",
        isEditing: false,
      },
      // ... more values
    ],
  },
  accountCostOrLiability: {
    label: "TK công nợ/chi phí",
    values: [
      {
        id: 1,
        value: "131",
        label: "131 - Phải thu khách hàng",
        isEditing: false,
      },
      // ... more values
    ],
  },
  // ... more fields
};
```

## Các Field hiện có

1. **documentType** - Loại chứng từ
2. **accountCostOrLiability** - TK công nợ/chi phí
3. **accountRevenue** - TK doanh thu
4. **discountAccount** - TK chiết khấu
5. **unit** - Đơn vị tính

## Props

| Prop      | Type       | Required | Description                          |
| --------- | ---------- | -------- | ------------------------------------ |
| `isOpen`  | `boolean`  | ✅       | Trạng thái mở/đóng modal             |
| `onClose` | `function` | ✅       | Callback khi đóng modal              |
| `onSave`  | `function` | ✅       | Callback khi lưu với dữ liệu đã chọn |

## Callback Data

Khi gọi `onSave`, modal sẽ trả về object chứa các giá trị đã chọn:

```javascript
{
  documentType: "MHNK - tiền mặt",
  accountCostOrLiability: "131",
  accountRevenue: "511",
  discountAccount: "521",
  unit: "Cái"
}
```

## Sử dụng

```jsx
import SetDefaultValueModal from "./modals/SetDefaultValueModal";

function MyComponent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedValues, setSelectedValues] = useState({});

  const handleSave = (formData) => {
    console.log("Selected values:", formData);
    setSelectedValues(formData);
    // Áp dụng giá trị mặc định cho các row đã chọn
  };

  return (
    <div>
      <button onClick={() => setIsModalOpen(true)}>
        Thiết lập giá trị mặc định
      </button>

      <SetDefaultValueModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
```

## Giao diện

### Header

- Icon Settings và tiêu đề
- Nút đóng modal

### Tabs

- Hiển thị tất cả các field có sẵn
- Số lượng giá trị trong mỗi field
- Tab active được highlight

### Table Content

- Cột Giá trị và Nhãn
- Rows có thể click để chọn
- Nút Sửa và Xóa cho mỗi row
- Inline editing khi sửa

### Add New Section

- Form thêm giá trị mới cho field hiện tại
- Validation: cả Giá trị và Nhãn phải có dữ liệu

### Selected Info

- Hiển thị giá trị đã chọn cho field hiện tại

### Summary Section

- Tổng kết tất cả giá trị đã chọn từ các field
- Hiển thị trước khi lưu

### Footer

- Nút Hủy và Lưu tất cả
- Nút Lưu chỉ active khi có ít nhất 1 giá trị được chọn

## CSS Classes

Tất cả CSS classes đều có tiền tố `set-default-value-` để đảm bảo không xung đột:

### Modal Structure

- `.set-default-value-modal` - Container chính
- `.set-default-value-modal-header` - Header với icon và title
- `.set-default-value-modal-body` - Body chứa tabs và content
- `.set-default-value-modal-footer` - Footer với buttons

### Tabs

- `.set-default-value-tabs` - Container cho tabs
- `.set-default-value-tab` - Individual tab
- `.set-default-value-tab-active` - Active tab
- `.set-default-value-tab-count` - Số lượng trong tab

### Table

- `.set-default-value-table-container` - Container cho table
- `.set-default-value-table` - Table element
- `.set-default-value-selected` - Selected row
- `.set-default-value-editing` - Row đang edit

### Buttons

- `.set-default-value-btn` - Base button style
- `.set-default-value-btn-primary` - Primary button
- `.set-default-value-btn-secondary` - Secondary button
- `.set-default-value-btn-icon` - Icon button

### Summary

- `.set-default-value-summary` - Summary section
- `.set-default-value-summary-list` - List container
- `.set-default-value-summary-item` - Individual summary item

## Responsive Design

Modal được thiết kế responsive với breakpoints:

- **Desktop**: Full width với tất cả features
- **Tablet**: Tabs wrap, buttons stack
- **Mobile**: Compact layout, vertical stacking

## Demo

Chạy file `SetDefaultValueDemo.jsx` để xem demo đầy đủ:

```jsx
import SetDefaultValueDemo from "./modals/SetDefaultValueModal/SetDefaultValueDemo";

// Trong component của bạn
<SetDefaultValueDemo />;
```

## Tùy chỉnh

### Thêm Field mới

Để thêm field mới, cập nhật `fieldConfigs` trong component:

```javascript
const [fieldConfigs, setFieldConfigs] = useState({
  // ... existing fields
  newField: {
    label: "Tên Field Mới",
    values: [
      { id: 1, value: "value1", label: "Label 1", isEditing: false },
      { id: 2, value: "value2", label: "Label 2", isEditing: false },
    ],
  },
});
```

### Thay đổi Style

Tất cả styles được định nghĩa trong `SetDefaultValueModal.css` với tiền tố `set-default-value-`. Có thể tùy chỉnh:

- Colors: Thay đổi các biến màu
- Spacing: Điều chỉnh padding/margin
- Typography: Font size, weight
- Animations: Transition effects

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Dependencies

- React 16.8+ (for hooks)
- react-modal
- lucide-react (for icons)
- PropTypes

## Chức năng nhập liệu tùy chỉnh

Modal hiện hỗ trợ nhập giá trị tùy chỉnh cho bất kỳ trường nào:

1. **Chọn tab trường**: Chuyển đến tab của trường bạn muốn nhập liệu
2. **Cuộn xuống phần nhập liệu**: Tìm phần "Nhập giá trị tùy chỉnh" ở cuối
3. **Nhập giá trị**: Gõ giá trị mong muốn vào ô input
4. **Áp dụng**: Nhấn nút "Áp dụng" hoặc phím Enter
5. **Kết quả**: Giá trị sẽ được áp dụng cho trường đó

Ví dụ sử dụng:

- Nhập "COST001" cho trường costObjectCode
- Nhập "DEP001" cho trường departmentCode
- Nhập bất kỳ giá trị tùy chỉnh nào khác

## Xử lý field không có values

Modal tự động xử lý 2 trường hợp:

### 1. Field có values (danh sách sẵn)

```javascript
{
  documentType: {
    label: "Loại chứng từ",
    values: [
      { id: 1, value: "MHNK", label: "MHNK - tiền mặt", isEditing: false },
      { id: 2, value: "MHKQK", label: "MHKQK - chuyển khoản", isEditing: false }
    ]
  }
}
```

- Hiển thị bảng để chọn từ danh sách
- Hiển thị phần "Nhập giá trị tùy chỉnh" để nhập giá trị khác

### 2. Field không có values (chỉ nhập liệu)

```javascript
{
  costObjectCode: {
    label: "Mã đối tượng chi phí";
    // Không có thuộc tính values
  }
}
```

- Không hiển thị bảng
- Chỉ hiển thị phần "Nhập giá trị cho [tên trường]"
- Tối ưu cho các trường cần nhập liệu tự do
