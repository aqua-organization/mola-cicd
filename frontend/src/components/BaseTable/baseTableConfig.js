export const documentTypeOptions = [
  {
    value: "MHNK - tiền mặt",
    label: "MHNK - tiền mặt",
  },
  {
    value: "MHNK - chuyển khoản",
    label: "MHNK - chuyển khoản",
  },
  {
    value: "MHNK - chưa thanh toán",
    label: "MHNK - chưa thanh toán",
  },
  {
    value: "MHKQK - tiền mặt",
    label: "MHKQK - tiền mặt",
  },
  {
    value: "MHKQK - chuyển khoản",
    label: "MHKQK - chuyển khoản",
  },
  {
    value: "MHKQK - chưa thanh toán",
    label: "MHKQK - chưa thanh toán",
  },
];

export const DOCUMENT_TYPE_SALES = {
  // 1. Không kiêm PX - Thu tiền
  DSNDC: "Không kiêm PX - Tiền mặt",

  // 2. Không kiêm PX - Chưa thu tiền
  DSNDCR: "Không kiêm PX - chưa thu tiền",

  // 3. Kiêm PX - Thu tiền
  DSWDC: "Kiêm PX - Tiền mặt",

  // 4. Kiêm PX - Chưa thu tiền
  DSWDCR: "Kiêm PX - chưa thu tiền",
};

export const purchaseInvoiceFieldConfigs = {
  documentType: {
    label: "Loại chứng từ",
    values: [
      {
        id: 1,
        value: Object.keys(DOCUMENT_TYPE_SALES)[0],
        label: DOCUMENT_TYPE_SALES.DSNDC,
        isEditing: false,
      },
      {
        id: 2,
        value: Object.keys(DOCUMENT_TYPE_SALES)[1],
        label: DOCUMENT_TYPE_SALES.DSNDCR,
        isEditing: false,
      },
      {
        id: 3,
        value: Object.keys(DOCUMENT_TYPE_SALES)[2],
        label: DOCUMENT_TYPE_SALES.DSWDC,
        isEditing: false,
      },
      {
        id: 4,
        value: Object.keys(DOCUMENT_TYPE_SALES)[3],
        label: DOCUMENT_TYPE_SALES.DSWDCR,
        isEditing: false,
      },
    ],
  },
};
