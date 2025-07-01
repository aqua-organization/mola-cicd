# Advanced Table Components

A comprehensive set of React table components with advanced features including sorting, pagination, selection, filtering, and responsive design.

## Features

- 🔄 **Sorting**: Click-to-sort with visual indicators
- 📄 **Pagination**: Built-in pagination with page controls
- ✅ **Selection**: Row selection with bulk actions
- 🔍 **Search**: Built-in search functionality
- 📱 **Responsive**: Mobile-friendly responsive design
- 🎨 **Customizable**: Multiple variants and themes
- ⚡ **Performance**: Optimized with useMemo and useCallback
- 🌙 **Dark Mode**: Built-in dark mode support

## Components

### Basic Components

- `TableContainer` - Main table wrapper
- `TableHeader` - Table header section
- `TableBody` - Table body section
- `TableFooter` - Table footer section
- `TableRow` - Table row component
- `TableHead` - Sortable table header cell
- `TableCell` - Table data cell
- `TableCheckbox` - Checkbox cell for selection
- `TableActions` - Action menu cell

### Advanced Component

- `AdvancedTable` - Complete table with all features built-in

## Basic Usage

### Simple Table

```jsx
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./components/ui/Table";

function SimpleTable() {
  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>John Doe</TableCell>
          <TableCell>john@example.com</TableCell>
          <TableCell>Admin</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jane Smith</TableCell>
          <TableCell>jane@example.com</TableCell>
          <TableCell>User</TableCell>
        </TableRow>
      </TableBody>
    </TableContainer>
  );
}
```

### Table with Sorting

```jsx
import { useState } from "react";
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "./components/ui/Table";

function SortableTable() {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
  ]);

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        if (prev.direction === "asc") return { key, direction: "desc" };
        if (prev.direction === "desc") return { key: null, direction: null };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
    if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  return (
    <TableContainer striped hover>
      <TableHeader sticky>
        <TableRow>
          <TableHead
            sortable
            sortDirection={
              sortConfig.key === "name" ? sortConfig.direction : null
            }
            onSort={() => handleSort("name")}
          >
            Name
          </TableHead>
          <TableHead
            sortable
            sortDirection={
              sortConfig.key === "email" ? sortConfig.direction : null
            }
            onSort={() => handleSort("email")}
          >
            Email
          </TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedData.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
```

### Table with Selection

```jsx
import { useState } from "react";
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCheckbox,
} from "./components/ui/Table";

function SelectableTable() {
  const [selectedRows, setSelectedRows] = useState(new Set());
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const handleRowSelect = (index, checked) => {
    const newSelected = new Set(selectedRows);
    if (checked) {
      newSelected.add(index);
    } else {
      newSelected.delete(index);
    }
    setSelectedRows(newSelected);
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedRows(new Set(data.map((_, i) => i)));
    } else {
      setSelectedRows(new Set());
    }
  };

  const isAllSelected = selectedRows.size === data.length;
  const isIndeterminate =
    selectedRows.size > 0 && selectedRows.size < data.length;

  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHead align="center">
            <input
              type="checkbox"
              checked={isAllSelected}
              onChange={(e) => handleSelectAll(e.target.checked)}
              ref={(input) => input && (input.indeterminate = isIndeterminate)}
            />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow key={row.id} selected={selectedRows.has(index)}>
            <TableCheckbox
              checked={selectedRows.has(index)}
              onChange={(e) => handleRowSelect(index, e.target.checked)}
            />
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
```

### Table with Actions

```jsx
import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableActions,
} from "./components/ui/Table";

function TableWithActions() {
  const data = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Smith", email: "jane@example.com" },
  ];

  const handleEdit = (id) => {
    console.log("Edit user:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead align="center">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row) => (
          <TableRow key={row.id}>
            <TableCell>{row.name}</TableCell>
            <TableCell>{row.email}</TableCell>
            <TableActions>
              <button onClick={() => handleEdit(row.id)}>Edit</button>
              <button onClick={() => handleDelete(row.id)}>Delete</button>
            </TableActions>
          </TableRow>
        ))}
      </TableBody>
    </TableContainer>
  );
}
```

## Advanced Usage

### Complete Advanced Table

```jsx
import { AdvancedTable } from "./components/ui/Table";

function UserTable() {
  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
      align: "left",
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
      align: "left",
    },
    {
      key: "role",
      title: "Role",
      sortable: true,
      align: "center",
    },
    {
      key: "status",
      title: "Status",
      sortable: false,
      align: "center",
      render: (value) => (
        <span className={`status-badge ${value.toLowerCase()}`}>{value}</span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      sortable: false,
      align: "center",
      render: (_, row) => (
        <div className="action-buttons">
          <button onClick={() => handleEdit(row.id)}>Edit</button>
          <button onClick={() => handleDelete(row.id)}>Delete</button>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "Inactive",
    },
    // ... more data
  ];

  const handleEdit = (id) => {
    console.log("Edit user:", id);
  };

  const handleDelete = (id) => {
    console.log("Delete user:", id);
  };

  const handleRowClick = (row) => {
    console.log("Row clicked:", row);
  };

  const handleSelectionChange = (selectedIndices) => {
    console.log("Selected rows:", selectedIndices);
  };

  return (
    <AdvancedTable
      data={data}
      columns={columns}
      sortable={true}
      selectable={true}
      pagination={true}
      pageSize={10}
      searchable={true}
      onRowClick={handleRowClick}
      onSelectionChange={handleSelectionChange}
      emptyMessage="No users found"
    />
  );
}
```

### Loading State

```jsx
import { AdvancedTable } from "./components/ui/Table";

function LoadingTable() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setData([
        /* your data */
      ]);
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <AdvancedTable
      data={data}
      columns={columns}
      loading={loading}
      pagination={true}
      searchable={true}
    />
  );
}
```

## Props

### TableContainer Props

| Prop         | Type                      | Default   | Description              |
| ------------ | ------------------------- | --------- | ------------------------ |
| `responsive` | boolean                   | true      | Enable responsive design |
| `striped`    | boolean                   | false     | Alternating row colors   |
| `bordered`   | boolean                   | true      | Table borders            |
| `hover`      | boolean                   | false     | Hover effects on rows    |
| `size`       | "sm" \| "default" \| "lg" | "default" | Table size               |

### TableHead Props

| Prop            | Type                          | Default | Description            |
| --------------- | ----------------------------- | ------- | ---------------------- |
| `sortable`      | boolean                       | false   | Enable sorting         |
| `sortDirection` | "asc" \| "desc" \| null       | null    | Current sort direction |
| `onSort`        | function                      | -       | Sort callback          |
| `align`         | "left" \| "center" \| "right" | "left"  | Text alignment         |

### TableCell Props

| Prop       | Type                          | Default | Description        |
| ---------- | ----------------------------- | ------- | ------------------ |
| `align`    | "left" \| "center" \| "right" | "left"  | Text alignment     |
| `truncate` | boolean                       | false   | Truncate long text |

### AdvancedTable Props

| Prop                | Type     | Default             | Description               |
| ------------------- | -------- | ------------------- | ------------------------- |
| `data`              | array    | []                  | Table data                |
| `columns`           | array    | []                  | Column definitions        |
| `sortable`          | boolean  | true                | Enable sorting            |
| `selectable`        | boolean  | false               | Enable row selection      |
| `pagination`        | boolean  | false               | Enable pagination         |
| `pageSize`          | number   | 10                  | Rows per page             |
| `searchable`        | boolean  | false               | Enable search             |
| `loading`           | boolean  | false               | Loading state             |
| `emptyMessage`      | string   | "No data available" | Empty state message       |
| `onRowClick`        | function | -                   | Row click callback        |
| `onSelectionChange` | function | -                   | Selection change callback |

## Column Definition

```jsx
const column = {
  key: "email", // Data property key
  title: "Email Address", // Column header
  sortable: true, // Enable sorting
  align: "left", // Text alignment
  truncate: false, // Truncate long text
  render: (value, row, index) => {
    // Custom render function
    return <span>{value}</span>;
  },
};
```

## Styling

The table components use CSS custom properties for theming:

```css
:root {
  --primary-color: #3b82f6;
  --color-primary-300: #93c5fd;
}
```

### Custom Classes

- `.table-row-selected` - Selected row styling
- `.table-head-sortable` - Sortable header styling
- `.table-cell-truncate` - Truncated cell styling
- `.table-actions-menu` - Action menu styling

## Responsive Behavior

- **Desktop**: Full table with all features
- **Tablet**: Horizontal scroll with optimized spacing
- **Mobile**: Compact layout with stacked pagination

## Dark Mode

The table automatically supports dark mode using CSS media queries:

```css
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}
```

## Best Practices

1. **Always provide a key**: Use unique `id` or `key` for each row
2. **Limit data size**: Use pagination for large datasets
3. **Optimize renders**: Use `render` functions efficiently
4. **Handle loading**: Always show loading states for async data
5. **Mobile first**: Design for mobile, enhance for desktop
6. **Accessibility**: Use proper ARIA labels and keyboard navigation
