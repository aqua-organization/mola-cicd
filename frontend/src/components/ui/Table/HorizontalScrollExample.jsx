import {
  TableContainer,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  AdvancedTable,
} from "./index";

// Example 1: Basic Table with Horizontal Scroll
export const BasicHorizontalScrollTable = () => {
  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "+84 123 456 789",
      address: "123 Nguyen Hue Street, District 1, Ho Chi Minh City",
      department: "Engineering",
      position: "Senior Developer",
      salary: "$5,000",
      startDate: "2020-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "+84 987 654 321",
      address: "456 Le Loi Boulevard, District 3, Ho Chi Minh City",
      department: "Marketing",
      position: "Marketing Manager",
      salary: "$4,500",
      startDate: "2021-03-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      phone: "+84 555 123 456",
      address: "789 Dong Khoi Street, District 1, Ho Chi Minh City",
      department: "Sales",
      position: "Sales Representative",
      salary: "$3,800",
      startDate: "2022-07-10",
      status: "Inactive",
    },
  ];

  return (
    <div>
      <h3>Basic Horizontal Scroll Table</h3>
      <TableContainer responsive minWidth="1200px">
        <TableHeader sticky>
          <TableRow>
            <TableHead minWidth="120px">Name</TableHead>
            <TableHead minWidth="200px">Email</TableHead>
            <TableHead minWidth="150px">Phone</TableHead>
            <TableHead minWidth="300px">Address</TableHead>
            <TableHead minWidth="120px">Department</TableHead>
            <TableHead minWidth="150px">Position</TableHead>
            <TableHead minWidth="100px" align="right">
              Salary
            </TableHead>
            <TableHead minWidth="120px">Start Date</TableHead>
            <TableHead minWidth="100px" align="center">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell minWidth="120px">{row.name}</TableCell>
              <TableCell minWidth="200px">{row.email}</TableCell>
              <TableCell minWidth="150px">{row.phone}</TableCell>
              <TableCell minWidth="300px" truncate maxWidth="300px">
                {row.address}
              </TableCell>
              <TableCell minWidth="120px">{row.department}</TableCell>
              <TableCell minWidth="150px">{row.position}</TableCell>
              <TableCell minWidth="100px" align="right">
                {row.salary}
              </TableCell>
              <TableCell minWidth="120px">{row.startDate}</TableCell>
              <TableCell minWidth="100px" align="center">
                <span className={`status-badge ${row.status.toLowerCase()}`}>
                  {row.status}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableContainer>
    </div>
  );
};

// Example 2: Advanced Table with Custom Column Widths
export const AdvancedHorizontalScrollTable = () => {
  const columns = [
    {
      key: "id",
      title: "ID",
      sortable: true,
      align: "center",
      width: "80px",
    },
    {
      key: "name",
      title: "Full Name",
      sortable: true,
      align: "left",
      minWidth: "150px",
    },
    {
      key: "email",
      title: "Email Address",
      sortable: true,
      align: "left",
      minWidth: "220px",
    },
    {
      key: "phone",
      title: "Phone Number",
      sortable: false,
      align: "left",
      minWidth: "140px",
    },
    {
      key: "address",
      title: "Address",
      sortable: false,
      align: "left",
      minWidth: "250px",
      maxWidth: "350px",
      truncate: true,
    },
    {
      key: "department",
      title: "Department",
      sortable: true,
      align: "center",
      minWidth: "120px",
    },
    {
      key: "position",
      title: "Position",
      sortable: true,
      align: "left",
      minWidth: "180px",
    },
    {
      key: "salary",
      title: "Salary",
      sortable: true,
      align: "right",
      minWidth: "100px",
    },
    {
      key: "startDate",
      title: "Start Date",
      sortable: true,
      align: "center",
      minWidth: "120px",
    },
    {
      key: "status",
      title: "Status",
      sortable: true,
      align: "center",
      minWidth: "100px",
      render: (value) => (
        <span
          className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
            value === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {value}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      sortable: false,
      align: "center",
      minWidth: "120px",
      render: (_, row) => (
        <div className="flex gap-2 justify-center">
          <button
            className="px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => console.log("Edit", row.id)}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => console.log("Delete", row.id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  const data = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@company.com",
      phone: "+84 123 456 789",
      address: "123 Nguyen Hue Street, District 1, Ho Chi Minh City, Vietnam",
      department: "Engineering",
      position: "Senior Full Stack Developer",
      salary: "$5,000",
      startDate: "2020-01-15",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@company.com",
      phone: "+84 987 654 321",
      address: "456 Le Loi Boulevard, District 3, Ho Chi Minh City, Vietnam",
      department: "Marketing",
      position: "Digital Marketing Manager",
      salary: "$4,500",
      startDate: "2021-03-20",
      status: "Active",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike.johnson@company.com",
      phone: "+84 555 123 456",
      address: "789 Dong Khoi Street, District 1, Ho Chi Minh City, Vietnam",
      department: "Sales",
      position: "Senior Sales Representative",
      salary: "$3,800",
      startDate: "2022-07-10",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah.wilson@company.com",
      phone: "+84 777 888 999",
      address: "321 Hai Ba Trung Street, District 3, Ho Chi Minh City, Vietnam",
      department: "HR",
      position: "Human Resources Manager",
      salary: "$4,200",
      startDate: "2019-11-05",
      status: "Active",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david.brown@company.com",
      phone: "+84 111 222 333",
      address:
        "654 Tran Hung Dao Street, District 5, Ho Chi Minh City, Vietnam",
      department: "Finance",
      position: "Financial Analyst",
      salary: "$4,000",
      startDate: "2023-02-14",
      status: "Active",
    },
  ];

  return (
    <div>
      <h3>Advanced Horizontal Scroll Table</h3>
      <AdvancedTable
        data={data}
        columns={columns}
        sortable={true}
        selectable={true}
        pagination={true}
        pageSize={5}
        searchable={true}
        striped={true}
        hover={true}
        onRowClick={(row) => console.log("Row clicked:", row)}
        onSelectionChange={(selected) => console.log("Selected:", selected)}
      />
    </div>
  );
};

// Example 3: Table with Different Column Sizes
export const VariableWidthTable = () => {
  return (
    <div>
      <h3>Variable Width Columns</h3>
      <TableContainer responsive>
        <TableHeader>
          <TableRow>
            <TableHead width="50px" align="center">
              #
            </TableHead>
            <TableHead minWidth="200px">Product Name</TableHead>
            <TableHead width="80px" align="center">
              SKU
            </TableHead>
            <TableHead width="100px" align="right">
              Price
            </TableHead>
            <TableHead width="80px" align="center">
              Stock
            </TableHead>
            <TableHead minWidth="300px">Description</TableHead>
            <TableHead width="120px" align="center">
              Category
            </TableHead>
            <TableHead width="100px" align="center">
              Status
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell width="50px" align="center">
              1
            </TableCell>
            <TableCell minWidth="200px">iPhone 14 Pro Max</TableCell>
            <TableCell width="80px" align="center">
              IP14PM
            </TableCell>
            <TableCell width="100px" align="right">
              $1,099
            </TableCell>
            <TableCell width="80px" align="center">
              25
            </TableCell>
            <TableCell minWidth="300px" wrap>
              Latest iPhone with A16 Bionic chip, ProRAW photography
              capabilities, and Dynamic Island feature. Available in multiple
              colors.
            </TableCell>
            <TableCell width="120px" align="center">
              Smartphones
            </TableCell>
            <TableCell width="100px" align="center">
              <span className="text-green-600">In Stock</span>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell width="50px" align="center">
              2
            </TableCell>
            <TableCell minWidth="200px">MacBook Pro 16&quot;</TableCell>
            <TableCell width="80px" align="center">
              MBP16
            </TableCell>
            <TableCell width="100px" align="right">
              $2,399
            </TableCell>
            <TableCell width="80px" align="center">
              8
            </TableCell>
            <TableCell minWidth="300px" wrap>
              Professional laptop with M2 Max chip, exceptional performance for
              creative professionals, and all-day battery life.
            </TableCell>
            <TableCell width="120px" align="center">
              Laptops
            </TableCell>
            <TableCell width="100px" align="center">
              <span className="text-orange-600">Low Stock</span>
            </TableCell>
          </TableRow>
        </TableBody>
      </TableContainer>
    </div>
  );
};

// Main demo component
const HorizontalScrollDemo = () => {
  return (
    <div className="p-6 space-y-8">
      <h2 className="text-2xl font-bold mb-6">
        Horizontal Scroll Table Examples
      </h2>

      <BasicHorizontalScrollTable />

      <AdvancedHorizontalScrollTable />

      <VariableWidthTable />

      <div className="mt-8">
        <h4 className="text-lg font-semibold mb-4">Features:</h4>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>
            Automatic horizontal scrolling when content exceeds container width
          </li>
          <li>Custom column widths with minWidth, maxWidth, and width props</li>
          <li>Sticky header that remains visible during horizontal scroll</li>
          <li>Custom scrollbar styling for better UX</li>
          <li>Text truncation and wrapping options</li>
          <li>Mobile-responsive design with scroll hints</li>
          <li>Smooth scrolling behavior</li>
        </ul>
      </div>
    </div>
  );
};

export default HorizontalScrollDemo;
