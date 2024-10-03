import {
  Blocks,
  LayoutDashboard,
  LayoutGrid,
  LucideIcon,
  PackageSearch,
  Settings,
  Shapes,
  Store,
  Users,
} from "lucide-react";

export type AdminSiteConfig = typeof adminSiteConfig;
export type MenuList = {
  groupLabel: string;
  menus: Menu[];
};

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

const getMenuList = (pathname: string) => {
  return [
    {
      groupLabel: "",
      menus: [
        {
          label: "Dashboard",
          href: "/admin",
          active: pathname.includes("/dashboard"),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Contents",
      menus: [
        {
          label: "Products",
          href: "/admin/products",
          active: pathname.includes("/products"),
          icon: Blocks,
          submenus: [
            {
              label: "Collections",
              href: "/admin/products/collections",
              active: pathname.includes("/collections"),
              icon: Shapes,
              submenus: [],
            },
            {
              label: "Brands",
              href: "/admin/products/brands",
              active: pathname.includes("/brands"),
              icon: Shapes,
              submenus: [],
            },
          ],
        },
        {
          label: "Orders",
          href: "/admin/orders",
          active: pathname.includes("/orders"),
          icon: PackageSearch,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Store",
      menus: [
        {
          label: "Store",
          href: "/admin/store",
          active: pathname.includes("/store"),
          icon: Store,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: "Settings",
      menus: [
        {
          label: "Users",
          href: "/users",
          active: pathname.includes("/users"),
          icon: Users,
          submenus: [],
        },
        {
          href: "/account",
          label: "Account",
          active: pathname.includes("/account"),
          icon: Settings,
          submenus: [],
        },
      ],
    },
  ];
};

export const adminSiteConfig = {
  logo: "SahilDev.pro",
  developer: "Sahil Shaikh",
  name: "Sahil Dev - Personal Portfolio",
  keywords: [
    "fullstack developement",
    "react",
    "javascript",
    "typescript",
    "nodejs",
  ],
  description:
    "I am a full-stack developer with expertise in Node.js. I have experience in building scalable, secure, and reliable web applications using various frameworks and technologies. I enjoy solving complex problems and learning new skills. I am passionate about creating high-quality code that follows best practices and industry standards. I am always looking for new challenges and opportunities to grow as a developer.",
  navItems: [
    {
      title: "Menu",
      items: [
        {
          label: "Dashboard",
          href: "/admin",
          icon: LayoutDashboard,
        },
        {
          label: "Products",
          href: "/admin/products",
          icon: Blocks,
          children: [
            {
              label: "Collections",
              href: "/admin/products/collections",
              icon: Shapes,
            },
            {
              label: "Brands",
              href: "/admin/products/brands",
              icon: Shapes,
            },
          ],
        },
        {
          label: "Orders",
          href: "/admin/orders",
          icon: PackageSearch,
        },
        {
          label: "Store",
          href: "/admin/store",
          icon: Store,
        },
      ],
    },
  ],
  getMenuList: getMenuList,
  email: "dev.sahil@icloud.com",
  links: {
    email: "mailto:dev.sahil@icloud.com",
    github: "https://github.com/ixahil",
    linkedin: "https://www.linkedin.com/in/imxahil/",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
