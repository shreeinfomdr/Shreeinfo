export default function JsonLd() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://shreeinfomdr.in/#business",
    name: "Shree Infotech",
    alternateName: [
      "Shree Infotech Mundra",
      "Shree Info Tech",
      "Shree Laptop Repair",
      "Shree Computer Shop Mundra",
    ],
    description:
      "Shree Infotech is the leading computer repair shop, laptop sales & service center in Mundra, Gujarat. 19+ years of expertise in chip-level laptop repair, screen replacement, water damage repair, desktop sales, gaming PC, printer services, networking solutions, and complete IT support.",
    url: "https://shreeinfomdr.in",
    telephone: "+919879713381",
    email: "shreeinfo.mdr@gmail.com",
    foundingDate: "2006",
    image:
      "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/95331757321876518.jpg",
    logo: "https://bytebiz.fra1.cdn.digitaloceanspaces.com/byte-qr/5797/mini-web/95331757321876518.jpg",
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, UPI, Bank Transfer",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mundra",
      addressRegion: "Gujarat",
      addressCountry: "IN",
      postalCode: "370421",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "22.8394",
      longitude: "69.7214",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "09:00",
        closes: "20:00",
      },
    ],
    sameAs: [
      "https://www.facebook.com/share/1DVHAQfqTJ/",
      "https://www.instagram.com/shree_infotech__",
      "https://youtube.com/@shreeinfotech1033",
      "https://shreeinfomdr.in",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "IT Products & Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Products",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Laptop",
                description:
                  "High-performance laptops from all major brands - HP, Dell, Lenovo, Asus, Acer for work, gaming, and everyday use",
                category: "Computers & Laptops",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Desktop Computer",
                description:
                  "Custom-built desktop computers and assembled PCs tailored to your specific needs and budget",
                category: "Computers & Desktops",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Gaming PC",
                description:
                  "Ultimate gaming rigs with top-tier specs, RGB lighting, high-end graphics cards and maximum performance",
                category: "Gaming Computers",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Printer",
                description:
                  "Printers from HP, Canon, Epson, Brother for home and office use. Inkjet and LaserJet available.",
                category: "Printers",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Computer Accessories",
                description:
                  "Keyboard, mouse, webcam, headset, monitor, UPS, cables, networking equipment and all computer accessories",
                category: "Computer Accessories",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Product",
                name: "Anti Virus Software",
                description:
                  "Licensed antivirus software - Quick Heal, Kaspersky, Norton, McAfee for complete protection",
                category: "Software",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Laptop Chip Level Repair",
                description:
                  "Expert motherboard chip-level diagnostics, IC replacement, BGA rework for all laptop brands in Mundra",
                provider: { "@type": "LocalBusiness", name: "Shree Infotech" },
                areaServed: { "@type": "City", name: "Mundra" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Water Damage Repair",
                description:
                  "Professional water damage laptop recovery, ultrasonic cleaning and restoration service",
                provider: { "@type": "LocalBusiness", name: "Shree Infotech" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Laptop Screen Replacement",
                description:
                  "Quick and reliable laptop screen, LCD, LED display replacement for all brands and models",
                provider: { "@type": "LocalBusiness", name: "Shree Infotech" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Computer Networking",
                description:
                  "LAN setup, WiFi installation, router configuration, office networking solutions in Mundra",
                provider: { "@type": "LocalBusiness", name: "Shree Infotech" },
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Software Installation & Support",
                description:
                  "Windows installation, OS setup, software installation, data recovery, virus removal services",
                provider: { "@type": "LocalBusiness", name: "Shree Infotech" },
              },
            },
          ],
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
      bestRating: "5",
      worstRating: "1",
    },
    review: [
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Rohan Mehta" },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Shree Infotech is my go-to place for all computer needs. They fixed my laptop quickly and at a very reasonable price. Excellent service!",
        datePublished: "2025-01-15",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Kavita Shah" },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "Professional, reliable, and knowledgeable! Shree Infotech helped us set up our office network smoothly. Highly recommended for business IT solutions.",
        datePublished: "2025-03-20",
      },
      {
        "@type": "Review",
        author: { "@type": "Person", name: "Anil Patel" },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody:
          "I bought a computer from Shree Infotech, and the quality is outstanding. Their after-sales support is equally impressive. Truly trustworthy.",
        datePublished: "2025-05-10",
      },
    ],
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Shree Infotech",
    url: "https://shreeinfomdr.in",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://shreeinfomdr.in/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://shreeinfomdr.in",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Products",
        item: "https://shreeinfomdr.in/#products",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Services",
        item: "https://shreeinfomdr.in/#services",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Contact",
        item: "https://shreeinfomdr.in/#inquiry",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(website) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
    </>
  );
}
