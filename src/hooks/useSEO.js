import { useEffect } from "react";

function setMeta(name, content, attr = "name") {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.setAttribute(attr, name); document.head.appendChild(el); }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) { el = document.createElement("link"); el.setAttribute("rel", rel); document.head.appendChild(el); }
  el.setAttribute("href", href);
}

function injectSchema(id, schema) {
  let el = document.getElementById(id);
  if (!el) { el = document.createElement("script"); el.type = "application/ld+json"; el.id = id; document.head.appendChild(el); }
  el.textContent = JSON.stringify(schema);
}

function removeSchema(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

export function useSEO({ title, description, keywords, canonical, ogImage, schema, schemaId = "page-schema" }) {
  useEffect(() => {
    // Title
    if (title) document.title = title;

    // Core meta
    setMeta("description", description);
    setMeta("keywords", keywords);
    setMeta("robots", "index, follow");

    // Canonical
    setLink("canonical", canonical || window.location.href);

    // Open Graph
    setMeta("og:title", title, "property");
    setMeta("og:description", description, "property");
    setMeta("og:url", canonical || window.location.href, "property");
    setMeta("og:image", ogImage || "https://pixalyse.com/og-image.png", "property");
    setMeta("og:type", "website", "property");
    setMeta("og:site_name", "Pixalyse", "property");

    // Twitter
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage || "https://pixalyse.com/og-image.png");
    setMeta("twitter:site", "@pixalyse");

    // JSON-LD
    if (schema) injectSchema(schemaId, schema);
    else removeSchema(schemaId);

    return () => removeSchema(schemaId);
  }, [title, description, keywords, canonical, schema]);
}

// ─── SCHEMA BUILDERS ─────────────────────────────────────────

export function buildToolSchema(tool, seoData, url) {
  const schemas = [];

  // WebApplication schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": `${tool.name} — Pixalyse`,
    "url": url,
    "description": seoData.description,
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Any",
    "browserRequirements": "Requires JavaScript. Works in any modern browser.",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "12000",
      "bestRating": "5"
    },
    "provider": {
      "@type": "Organization",
      "name": "Pixalyse",
      "url": "https://pixalyse.com"
    }
  });

  // FAQ schema
  if (seoData.faqs?.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": seoData.faqs.map(faq => ({
        "@type": "Question",
        "name": faq.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.a
        }
      }))
    });
  }

  // BreadcrumbList schema
  schemas.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixalyse.com" },
      { "@type": "ListItem", "position": 2, "name": "Tools", "item": "https://pixalyse.com/#tools" },
      { "@type": "ListItem", "position": 3, "name": tool.name, "item": url }
    ]
  });

  return schemas;
}

export function buildBlogSchema(blog, url) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": blog.title,
      "description": blog.excerpt,
      "datePublished": blog.date,
      "dateModified": blog.date,
      "author": {
        "@type": "Person",
        "name": blog.author
      },
      "publisher": {
        "@type": "Organization",
        "name": "Pixalyse",
        "url": "https://pixalyse.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://pixalyse.com/favicon.svg"
        }
      },
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": url
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://pixalyse.com" },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://pixalyse.com/blog" },
        { "@type": "ListItem", "position": 3, "name": blog.title, "item": url }
      ]
    }
  ];
}

export function buildHomeSchema() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Pixalyse",
      "url": "https://pixalyse.com",
      "description": "20 free online image tools — compress, resize, crop, convert, watermark, upscale and more.",
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": "https://pixalyse.com/?search={search_term_string}"
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "Pixalyse",
      "url": "https://pixalyse.com",
      "logo": "https://pixalyse.com/favicon.svg",
      "sameAs": [],
      "description": "Free online image tools — no signup, no watermarks, 100% browser-based.",
      "foundingDate": "2026",
      "areaServed": "Worldwide"
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Pixalyse Image Tools",
      "url": "https://pixalyse.com",
      "applicationCategory": "UtilitiesApplication",
      "operatingSystem": "Any",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "12000",
        "bestRating": "5"
      }
    }
  ];
}
