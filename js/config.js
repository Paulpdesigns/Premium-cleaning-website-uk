window.SITE_CONFIG = {
  business: {
    name: "Cleaning Template",
    tagline: "Professional Cleaning. A Fresher Space.",
    phone: "+442034567890",
    phoneDisplay: "020 3456 7890",
    whatsapp: "+447911123456",
    email: "hello@pristinecleaning.example",
    address: "128 High Street, London, SW1A 1AA",
    hours: ["Mon-Fri: 8:00am - 6:00pm", "Saturday: 9:00am - 3:00pm", "Sunday: By appointment"],
    announcement: "Premium cleaning-business website template ready for customisation",
    primaryColor: "#0f8f86",
    secondaryColor: "#17324d",
    accentColor: "#f2b84b",
    social: {
      instagram: "#",
      facebook: "#",
      linkedin: "#"
    }
  },
  serviceAreas: ["Camden", "Islington", "Shoreditch", "Greenwich", "Clapham", "Hackney", "Richmond", "Chelsea"],
  services: [
    { id: "residential", title: "Residential Cleaning", icon: "home", detail: "Regular home cleaning for kitchens, bedrooms, bathrooms and living spaces.", bestFor: "Busy families, professionals and anyone who wants a consistently fresh home." },
    { id: "deep", title: "Deep Cleaning", icon: "sparkles", detail: "Detailed cleaning for spaces that need extra attention, buildup removal and a full reset.", bestFor: "Seasonal refreshes, first-time clients and homes that need a thorough reset." },
    { id: "move", title: "Move-In / Move-Out", icon: "key", detail: "Professional cleaning before moving in or after moving out, with detail-focused room-by-room service.", bestFor: "Tenants, landlords, sellers and buyers preparing for the next chapter." },
    { id: "commercial", title: "Commercial Cleaning", icon: "building", detail: "Reliable cleaning for offices, shops, studios and commercial properties.", bestFor: "Workplaces that need dependable scheduled cleaning without disrupting operations." },
    { id: "airbnb", title: "Airbnb Turnover", icon: "calendar", detail: "Professional turnover cleaning for short-term rentals, guest-ready presentation and restocking checks.", bestFor: "Hosts who need fast, consistent, review-ready turnovers." },
    { id: "construction", title: "Post-Construction", icon: "tool", detail: "Removal of dust, debris and construction residue after renovation or building work.", bestFor: "Contractors, property managers and owners after renovation projects." }
  ],
  pricing: {
    base: { house: 120, apartment: 95, office: 150, commercial: 220, airbnb: 110 },
    size: { studio: 0, bedrooms2: 35, bedrooms4: 80, bedrooms5: 145, smallOffice: 0, mediumOffice: 90, largeOffice: 190, custom: 260 },
    type: { standard: 0, deep: 65, move: 95, recurring: -15, construction: 140 },
    frequency: { once: 1, weekly: 0.82, biweekly: 0.88, monthly: 0.95 },
    rangePercent: 0.18
  },
  stats: [
    { value: 500, suffix: "+", label: "Spaces cleaned" },
    { value: 98, suffix: "%", label: "Placeholder satisfaction" },
    { value: 5, suffix: "-Star", label: "Review-ready service" },
    { value: 5, suffix: "+", label: "Years experience" }
  ],
  testimonials: [
    { name: "Maya R.", location: "Islington", rating: 5, text: "The team arrived on time, worked carefully, and left our kitchen and bathrooms looking noticeably brighter." },
    { name: "Daniel K.", location: "Shoreditch", rating: 5, text: "We use them for our office twice a month. The communication is clear and the space always feels ready for clients." },
    { name: "Priya S.", location: "Greenwich", rating: 5, text: "Their move-out clean saved us so much stress. Every detail was handled with real care." },
    { name: "Marcus T.", location: "Clapham", rating: 5, text: "Professional, friendly and consistent. The recurring schedule has been effortless." },
    { name: "Elena W.", location: "Richmond", rating: 5, text: "Our short-term rental turns around quickly now, and guests keep mentioning how clean it feels." }
  ],
  portfolio: [
    {
      id: "kitchen-deep-clean",
      title: "Residential Kitchen Reset",
      category: "deep",
      service: "Deep Cleaning",
      location: "Islington",
      description: "A detail-focused kitchen clean covering surfaces, cabinet fronts, appliances and floor edges.",
      before: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1100&q=78",
      after: "https://images.unsplash.com/photo-1556912173-3bb406ef7e77?auto=format&fit=crop&w=1100&q=82"
    },
    {
      id: "bathroom-transform",
      title: "Bathroom Transformation",
      category: "deep",
      service: "Deep Cleaning",
      location: "Greenwich",
      description: "Tile, glass, fixtures and high-touch surfaces refreshed for a brighter finish.",
      before: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1100&q=72",
      after: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1100&q=82"
    },
    {
      id: "living-room-refresh",
      title: "Living Room Refresh",
      category: "residential",
      service: "Residential Cleaning",
      location: "Chelsea",
      description: "Routine residential clean with dusting, vacuuming, surfaces and presentation reset.",
      before: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1100&q=76",
      after: "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=1100&q=84"
    },
    {
      id: "office-cleaning",
      title: "Office Cleaning",
      category: "commercial",
      service: "Commercial Cleaning",
      location: "Shoreditch",
      description: "After-hours office cleaning for desks, meeting rooms, shared areas and floors.",
      before: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1100&q=76",
      after: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1100&q=84"
    },
    {
      id: "move-out-cleaning",
      title: "Move-Out Apartment Clean",
      category: "move",
      service: "Move-In / Move-Out",
      location: "Hackney",
      description: "Vacant apartment cleaned for handover, including kitchen, bath, floors and touchpoints.",
      before: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1100&q=76",
      after: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1100&q=84"
    },
    {
      id: "post-construction",
      title: "Post-Construction Cleanup",
      category: "construction",
      service: "Post-Construction",
      location: "Richmond",
      description: "Fine dust removal and final presentation cleaning after renovation work.",
      before: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1100&q=76",
      after: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1100&q=84"
    }
  ],
  images: {
    hero: "assets/images/hero-cleaner-bucket.jpg",
    servicesHero: "assets/images/cleaning-supplies-flatlay.jpg",
    aboutHero: "assets/images/cleaner-with-products.jpg",
    portfolioHero: "https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=1500&q=82",
    contactHero: "https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?auto=format&fit=crop&w=1500&q=82",
    team: "assets/images/team-office-cleaning.jpg"
  }
};
