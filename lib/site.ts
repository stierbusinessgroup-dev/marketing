export const site = {
  name: "S-Tier Business Group",
  shortName: "S-Tier",
  email: "stierbusinessgroup@gmail.com",
  description:
    "Business consulting and AI implementation for Sonoma County.",
  url: "https://stierbusinessgroup.com",
} as const;

export type NavLink = { href: string; label: string };

export const primaryNav: NavLink[] = [
  { href: "/services", label: "Services" },
  { href: "/agent", label: "Agent" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const footerNav: { heading: string; links: NavLink[] }[] = [
  {
    heading: "Firm",
    links: [
      { href: "/about", label: "About" },
      { href: "/services", label: "Services" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Product",
    links: [
      { href: "/agent", label: "The Agent" },
      { href: "/learn", label: "Learn" },
      { href: "/research", label: "Research" },
    ],
  },
  {
    heading: "Portfolio",
    links: [
      { href: "/initiatives", label: "Initiatives" },
      { href: "/opportunities", label: "Opportunities" },
    ],
  },
];
