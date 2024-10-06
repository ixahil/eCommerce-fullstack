export const registerFormControls = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your Username",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your Email",
    componentType: "input",
    type: "email",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
    required: true,
  },
];

export const loginFormControls = [
  {
    name: "username",
    label: "Username",
    placeholder: "Enter your Username",
    componentType: "input",
    type: "text",
    required: true,
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your Password",
    componentType: "input",
    type: "password",
    required: true,
  },
];

export const addBrandFormControls: CollectionFormGroup[] = [
  {
    groupId: 1,
    children: [
      {
        groupLabel: "Basic Info",
        items: [
          {
            label: "Name",
            name: "name",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the brand name",
          },
          {
            label: "Description",
            name: "description",
            componentType: "textarea",
            type: "textarea",
            required: false,
            placeholder: "Enter the brand description",
          },
        ],
      },
      {
        groupLabel: "Featured Image",
        items: [
          {
            label: "Image",
            name: "image",
            componentType: "media",
            type: "image",
            required: false,
            placeholder: "Upload brand image",
            multiple: false,
          },
        ],
      },
    ],
  },
  {
    groupId: 2,
    children: [
      {
        groupLabel: "Status",
        items: [
          {
            label: "Brand Status",
            name: "status",
            componentType: "select",
            type: "select",
            required: true,
            placeholder: "Select Status",
            options: [
              { handle: "ACTIVE", label: "Active" },
              { handle: "DRAFT", label: "Draft" },
            ],
          },
        ],
      },

      {
        groupLabel: "Handle",
        items: [
          {
            label: "Handle",
            name: "handle",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the URL Handle",
            disabled: true,
          },
        ],
      },
    ],
  },
];

export type CollectionFormControls = {
  label: string;
  name: string;
  componentType: "input" | "textarea" | "select" | "number" | "media";
  type: string;
  required: boolean;
  placeholder: string;
  defaultValue?: string;
  options?: Array<{ handle: string; label: string }> | [];
  disabled?: boolean;
  min?: number;
  step?: number;
  default?: number;
  multiple?: boolean;
};

export type CollectionFormGroup = {
  groupId: number;
  children: Array<{
    groupLabel: string;
    items: CollectionFormControls[];
  }>;
};

export const addCollectionFormControls: CollectionFormGroup[] = [
  {
    groupId: 1,
    children: [
      {
        groupLabel: "Basic Info",
        items: [
          {
            label: "Name",
            name: "name",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the collection name",
          },
          {
            label: "Description",
            name: "description",
            componentType: "textarea",
            type: "textarea",
            required: false,
            placeholder: "Enter the collection description",
          },
        ],
      },
      {
        groupLabel: "Featured Image",
        items: [
          {
            label: "Image",
            name: "image",
            componentType: "media",
            type: "image",
            required: false,
            placeholder: "Upload collection image",
            multiple: false,
          },
        ],
      },
    ],
  },
  {
    groupId: 2,
    children: [
      {
        groupLabel: "Status",
        items: [
          {
            label: "Collection Status",
            name: "status",
            componentType: "select",
            type: "select",
            required: true,
            placeholder: "Select Status",
            options: [
              { handle: "ACTIVE", label: "Active" },
              { handle: "DRAFT", label: "Draft" },
            ],
          },
        ],
      },

      {
        groupLabel: "Handle",
        items: [
          {
            label: "Handle",
            name: "handle",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the URL Handle",
            disabled: true,
          },
        ],
      },
    ],
  },
];

export type AddProductFormItem = {
  label: string;
  name: string;
  componentType: "input" | "textarea" | "select" | "number" | "media";
  type: string;
  required: boolean;
  placeholder: string;
  defaultValue?: string;
  options?: Array<{ handle: string; label: string }> | [];
  disabled?: boolean;
  min?: number;
  step?: number;
  default?: number;
  multiple?: boolean;
};

export type AddProductFormGroup = {
  groupId: number;
  children: Array<{
    groupLabel: string;
    items: AddProductFormItem[];
  }>;
};

export const addProductFormControls: AddProductFormGroup[] = [
  {
    groupId: 1,
    children: [
      {
        groupLabel: "Basic Info",
        items: [
          {
            label: "Name",
            name: "name",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the product name",
          },
          {
            label: "Description",
            name: "description",
            componentType: "textarea",
            type: "textarea",
            placeholder: "Enter the product description",
            required: false,
          },
        ],
      },
      {
        groupLabel: "Media",
        items: [
          {
            label: "Product Image",
            name: "images",
            componentType: "media",
            type: "image",
            placeholder: "Enter the product image",
            required: false,
            multiple: true,
          },
        ],
      },
      {
        groupLabel: "Pricing",
        items: [
          {
            label: "Price",
            name: "price",
            componentType: "number",
            type: "number",
            default: 0,
            min: 0,
            placeholder: "Enter the product price",
            required: true,
          },
          {
            label: "Sale price",
            name: "salePrice",
            componentType: "number",
            type: "number",
            default: 0,
            min: 0,
            placeholder: "Enter the product sale price",
            required: true,
          },
        ],
      },
      {
        groupLabel: "Inventory",
        items: [
          {
            label: "Sku",
            name: "sku",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the product sku",
          },
          {
            label: "Total Stock",
            name: "stock",
            componentType: "number",
            type: "number",
            default: 0,
            min: 0,
            placeholder: "Enter the product Stock",
            required: true,
          },
        ],
      },
      {
        groupLabel: "Search Engine Optimization (SEO)",
        items: [
          {
            label: "Page Title",
            name: "pageTitle",
            componentType: "input",
            type: "text",
            required: false,
            placeholder: "Enter the page title",
            disabled: true,
          },
          {
            label: "Meta Description",
            name: "metaDescription",
            componentType: "input",
            type: "text",
            required: false,
            placeholder: "Enter the Meta Description",
            disabled: true,
          },
          {
            label: "Handle",
            name: "handle",
            componentType: "input",
            type: "text",
            required: false,
            placeholder: "Enter the URL Handle",
            disabled: true,
            defaultValue: "product-handle",
          },
        ],
      },
    ],
  },
  {
    groupId: 2,
    children: [
      {
        groupLabel: "Status",
        items: [
          {
            label: "Product Status",
            name: "status",
            componentType: "select",
            type: "select",
            defaultValue: "ACTIVE",
            required: true,
            placeholder: "Select Status",
            options: [
              { handle: "ACTIVE", label: "Active" },
              { handle: "DRAFT", label: "Draft" },
            ],
          },
        ],
      },
      {
        groupLabel: "Organization",
        items: [
          {
            label: "Brand",
            name: "brand",
            componentType: "select",
            type: "select",
            required: true,
            options: [
              { handle: "electronics", label: "Electronics" },
              { handle: "clothing", label: "Clothing" },
              { handle: "books", label: "Books" },
              { handle: "home", label: "Home & Garden" },
            ],
            placeholder: "Select the product brand",
          },
          {
            label: "Collections",
            name: "collections",
            componentType: "select",
            type: "select",
            required: true,
            options: [
              { handle: "electronics", label: "Electronics" },
              { handle: "clothing", label: "Clothing" },
              { handle: "books", label: "Books" },
              { handle: "home", label: "Home & Garden" },
            ],
            placeholder: "Select the product collection",
          },
        ],
      },
    ],
  },
];
