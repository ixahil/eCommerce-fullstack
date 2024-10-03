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

// export const addProductFormControls = {
//   name: {
//     label: "Name",
//     name: "name",
//     componentType: "input",
//     type: "text",
//     required: true,
//     placeholder: "Enter the product name",
//   },
//   sku: {
//     label: "Sku",
//     name: "sku",
//     componentType: "input",
//     type: "text",
//     required: true,
//     placeholder: "Enter the product sku",
//   },
//   description: {
//     label: "Description",
//     name: "description",
//     componentType: "textarea",
//     placeholder: "Enter the product description",
//   },

//   price: {
//     label: "Price",
//     name: "price",
//     componentType: "number",
//     type: "number",
//     default: 0,
//     min: 0,
//     step: 0.01,
//     placeholder: "Enter the product price",
//     required: true,
//   },
//   salePrice: {
//     label: "Sale price",
//     name: "salePrice",
//     componentType: "number",
//     type: "number",
//     default: 0,
//     min: 0,
//     step: 0.01,
//     placeholder: "Enter the product sale price",
//     required: true,
//   },
//   stock: {
//     label: "Total Stock",
//     name: "stock",
//     componentType: "input",
//     type: "number",
//     default: 0,
//     min: 0,
//     step: 0.01,
//     placeholder: "Enter the product Stock",
//     required: true,
//   },

//   brand: {
//     label: "Brand",
//     name: "brand",
//     componentType: "select",
//     required: true,
//     options: [
//       { id: "nike", label: "Nike" },
//       { id: "adidas", label: "Adidas" },
//       { id: "puma", label: "Puma" },
//       { id: "levis", label: "Levis" },
//     ],
//     placeholder: "Select the product brand",
//   },
//   collection: {
//     label: "Collections",
//     name: "collections",
//     componentType: "select",
//     required: true,
//     options: [
//       { id: "electronics", label: "Electronics" },
//       { id: "clothing", label: "Clothing" },
//       { id: "books", label: "Books" },
//       { id: "home", label: "Home & Garden" },
//     ],
//     placeholder: "Select the product collection",
//   },
//   pageTitle: {
//     label: "Page Title",
//     name: "pageTitle",
//     componentType: "input",
//     type: "text",
//     required: true,
//     placeholder: "Enter the page title",
//   },
//   metaDescription: {
//     label: "Meta Description",
//     name: "metaDescription",
//     componentType: "input",
//     type: "text",
//     required: true,
//     placeholder: "Enter the Meta Description",
//   },
//   handle: {
//     label: "Handle",
//     name: "handle",
//     componentType: "input",
//     type: "text",
//     required: true,
//     placeholder: "Enter the URL Handle",
//   },
//   status: {
//     label: "Status",
//     name: "status",
//     componentType: "select",
//     type: "select",
//     required: true,
//     placeholder: "Select Status",
//     options: ["Active", "Draft"],
//   },
// };

export const addCollectionFormControls = [
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
            placeholder: "Enter the collection description",
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
              { id: "ACTIVE", label: "Active" },
              { id: "DRAFT", label: "Draft" },
            ],
          },
        ],
      },
      {
        groupLabel: "Media",
        items: [
          {
            label: "Featured Image",
            name: "image",
            componentType: "input",
            type: "image",
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
          },
        ],
      },
    ],
  },
];

export const menuFormControls = [
  {
    label: "Name",
    name: "name",
    componentType: "input",
    type: "text",
    required: true,
    placeholder: "Enter the Menu Label",
  },
];

export type AddProductFormControls = typeof addProductFormControls;

export const addProductFormControls = [
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
            placeholder: "Enter the product description",
          },
        ],
      },
      {
        groupLabel: "Media",
        items: [
          {
            label: "image",
            name: "image",
            componentType: "input",
            type: "image",
            placeholder: "Enter the product image",
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
            step: 0.01,
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
            step: 0.01,
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
            componentType: "input",
            type: "number",
            default: 0,
            min: 0,
            step: 0.01,
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
            required: true,
            placeholder: "Enter the page title",
          },
          {
            label: "Meta Description",
            name: "metaDescription",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the Meta Description",
          },
          {
            label: "Handle",
            name: "handle",
            componentType: "input",
            type: "text",
            required: true,
            placeholder: "Enter the URL Handle",
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
            required: true,
            placeholder: "Select Status",
            options: [
              { id: "ACTIVE", label: "Active" },
              { id: "DRAFT", label: "Draft" },
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
            required: true,
            options: [
              { id: "nike", label: "Nike" },
              { id: "adidas", label: "Adidas" },
              { id: "puma", label: "Puma" },
              { id: "levis", label: "Levis" },
            ],
            placeholder: "Select the product brand",
          },
          {
            label: "Collections",
            name: "collections",
            componentType: "select",
            required: true,
            options: [
              { id: "electronics", label: "Electronics" },
              { id: "clothing", label: "Clothing" },
              { id: "books", label: "Books" },
              { id: "home", label: "Home & Garden" },
            ],
            placeholder: "Select the product collection",
          },
        ],
      },
    ],
  },
];
