/**
 * Capa de contenido editable.
 *
 * Todo el texto, imágenes y datos de la web viven en `src/content/*.json`.
 * El dashboard de escritorio edita esos JSON y publica vía git; Astro los
 * compila en el build, así que en producción no hay ninguna petición extra.
 *
 * REGLA: aquí sólo va contenido. Las clases, colores y estructura del diseño
 * se quedan en los .astro y NO son editables desde el dashboard.
 */

import siteData from "../content/site.json";
import navigationData from "../content/navigation.json";
import homeData from "../content/home.json";
import servicesData from "../content/services.json";
import projectsData from "../content/projects.json";
import reviewsData from "../content/reviews.json";
import pagesData from "../content/pages.json";

/* ------------------------------------------------------------------ */
/* Tipos                                                               */
/* ------------------------------------------------------------------ */

export interface Social {
  name: string;
  url: string;
  icon: string;
}

export interface Site {
  brand: {
    name: string;
    shortName: string;
    navTitle: string;
    navSubtitle: string;
    logo: string;
    logoAlt: string;
    footerWordmark: string;
    footerName: string;
    footerTagline: string;
    footerDescription: string;
  };
  contact: {
    phoneDisplay: string;
    phoneLink: string;
    phoneSchema: string;
    email: string;
    hours: string;
    addressLine: string;
    serviceAreaLine: string;
    city: string;
    region: string;
    country: string;
    latitude: string;
    longitude: string;
  };
  socials: Social[];
  seo: {
    defaultTitle: string;
    defaultDescription: string;
    defaultImage: string;
    keywords: string;
    author: string;
    googleSiteVerification: string;
    siteName: string;
    locale: string;
  };
  business: {
    priceRange: string;
    schemaImage: string;
    siteUrl: string;
    areasServed: string[];
    openingHours: { days: string[]; opens: string; closes: string };
    knowsAbout: string[];
  };
  forms: { formspreeEndpoint: string };
}

export interface NavLink {
  label: string;
  href: string;
  /** Etiqueta alternativa para el menú móvil (si difiere de `label`). */
  mobileLabel?: string;
}

export interface Navigation {
  serviceMenu: { name: string; desc: string; slug: string }[];
  /**
   * El primer enlace se pinta antes del desplegable de Servicios y el resto
   * después. Esa posición es parte de la estructura del diseño y es fija.
   */
  navLinks: NavLink[];
  servicesDropdownLabel: string;
  servicesDropdownFooter: string;
  ctaLabel: string;
  mobile: { menuTitle: string; servicesLabel: string; ctaLabel: string };
  footer: {
    companyHeading: string;
    companyLinks: (NavLink & { badge: boolean })[];
    servicesHeading: string;
    servicesLinks: NavLink[];
    contactHeading: string;
    legalLinks: NavLink[];
    credit: string;
  };
}

export interface Cta {
  label: string;
  href: string;
}

export interface Home {
  hero: {
    backgroundImage: string;
    backgroundAlt: string;
    badge: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    primaryCta: Cta;
    secondaryCta: Cta;
    schemaDescription: string;
  };
  services: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  about: {
    image: string;
    imageAlt: string;
    quote: string;
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    paragraphs: string[];
    stats: { value: string; label: string }[];
    signature: string;
    schemaDescription: string;
    metaDescription: string;
  };
  projects: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    ctaLabel: string;
    ctaHref: string;
    mobileCtaLabel: string;
    mobileCtaHref: string;
  };
  process: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    steps: { number: string; title: string; desc: string }[];
    trustValues: string[];
  };
  reviews: {
    badge: string;
    heading: string;
    ratingValue: string;
    reviewCount: string;
  };
  contact: {
    eyebrow: string;
    headingLine1: string;
    headingLine2: string;
    description: string;
    phoneLabel: string;
    emailLabel: string;
    form: {
      nameLabel: string;
      phoneLabel: string;
      emailLabel: string;
      serviceLabel: string;
      servicePlaceholder: string;
      serviceOptions: { value: string; label: string }[];
      messageLabel: string;
      submitLabel: string;
      successTitle: string;
      successMessageText: string;
      successResetLabel: string;
    };
  };
}

export interface ServiceCard {
  id: string;
  title: string;
  desc: string;
  image: string;
  link: string;
  alt: string;
}

export interface Project {
  category: string;
  title: string;
  location: string;
  image: string;
}

export interface Review {
  name: string;
  loc: string;
  text: string;
  stars: number;
  img: string | null;
}

/** Bloque numerado de la sección "essence". La numeración es del diseño. */
export interface NumberedItem {
  title: string;
  desc: string;
}

/**
 * Las cuatro páginas de servicio comparten esta forma de contenido, pero
 * cada una mantiene su propio .astro porque difieren en detalles de diseño
 * (el salto de línea del H1, el gradiente del hero, el orden en móvil).
 */
export interface ServicePage {
  seo: {
    title: string;
    description: string;
    keywords: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
  };
  hero: {
    image: string;
    imageAlt: string;
    eyebrow: string;
    /** Parte normal del H1. */
    headingText: string;
    /** Parte en cursiva del H1. */
    headingAccent: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
  };
  essence: {
    headingLine1: string;
    headingLine2: string;
    description: string;
    steps: NumberedItem[];
    image: string;
    imageAlt: string;
  };
  gallery: {
    eyebrow: string;
    heading: string;
    ctaLabel: string;
    ctaHref: string;
    /** 5 huecos fijos del mosaico; su posición y proporción son del diseño. */
    images: { image: string; alt: string; caption: string }[];
    quote: { text: string; author: string };
  };
  cta: {
    headingText: string;
    headingAccent: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
  };
}

export interface CareersPage {
  seo: { title: string; description: string };
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  benefitsHeading: string;
  benefits: string[];
  form: {
    subject: string;
    nameLabel: string;
    phoneLabel: string;
    positionLabel: string;
    positionPlaceholder: string;
    positionOptions: { value: string; label: string }[];
    experienceLabel: string;
    skillsLabel: string;
    skillsPlaceholder: string;
    submitLabel: string;
    successTitle: string;
    successText: string;
    successResetLabel: string;
  };
}

/** La página de contacto reutiliza el formulario de `home.contact.form`. */
export interface ContactPage {
  seo: { title: string; description: string };
  eyebrow: string;
  headingLine1: string;
  headingLine2: string;
  description: string;
  phoneLabel: string;
  emailLabel: string;
}

export interface GalleryPage {
  seo: { title: string; description: string };
  eyebrow: string;
  headingText: string;
  headingAccent: string;
  description: string;
  instagram: { emptyStateText: string; handle: string; url: string };
  ctaHeading: string;
  ctaDescription: string;
  ctaLabel: string;
  ctaHref: string;
}

export interface Pages {
  "cabinet-refinishing": ServicePage;
  "residential-interior": ServicePage;
  "residential-exterior": ServicePage;
  "commercial-services": ServicePage;
  careers: CareersPage;
  contact: ContactPage;
  gallery: GalleryPage;
}

/* ------------------------------------------------------------------ */
/* Exports                                                             */
/* ------------------------------------------------------------------ */

export const site = siteData as Site;
export const navigation = navigationData as Navigation;
export const home = homeData as Home;
export const services = servicesData.items as ServiceCard[];
export const projects = projectsData.items as Project[];
export const reviews = reviewsData.items as Review[];
export const pages = pagesData as unknown as Pages;

/**
 * Los reviews se pintan en dos marquesinas que corren en direcciones
 * opuestas. Partimos la lista por la mitad para no obligar al cliente a
 * gestionar dos listas separadas desde el dashboard.
 */
export const reviewRows: [Review[], Review[]] = [
  reviews.slice(0, Math.ceil(reviews.length / 2)),
  reviews.slice(Math.ceil(reviews.length / 2)),
];

/** `tel:` normalizado a partir del teléfono configurado. */
export const telHref = `tel:${site.contact.phoneLink}`;
/** `mailto:` normalizado a partir del email configurado. */
export const mailtoHref = `mailto:${site.contact.email}`;
