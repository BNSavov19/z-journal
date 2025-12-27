import type { CMSData } from "./types";

export const defaultData: CMSData = {
  articles: [
    {
      id: "a1",
      title: "Markets Open With Optimism After Rate Pause",
      dek: "Global equities climb as investors weigh signals from central banks and a cooling labor market.",
      content:
        "Traders welcomed a steady interest rate decision, shifting attention to corporate earnings and easing inflation. Analysts caution that volatility remains as energy prices and geopolitical risks continue to ripple across the week.",
      author: "Leena Rao",
      date: "2024-11-18",
      category: "Markets",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "a2",
      title: "Inside the Supply Chain Reset",
      dek: "Manufacturers rethink logistics strategies with a focus on resilience and regional partners.",
      content:
        "Executives are prioritizing shorter routes and nearshoring as shipping costs stabilize. The shift has opened opportunities for mid-sized suppliers and new distribution hubs across Southeast Europe and North Africa.",
      author: "David Okoro",
      date: "2024-11-17",
      category: "Industry",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "a3",
      title: "The Rise of AI-Ready Cities",
      dek: "Urban planners prepare for the infrastructure demands of automated transit and smart grids.",
      content:
        "City leaders are mapping out AI-ready corridors with upgraded fiber networks and energy storage. Civic labs are partnering with universities to pilot sensor-based traffic systems and predictive maintenance.",
      author: "Maya Chen",
      date: "2024-11-16",
      category: "Tech",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1475359524104-d101d02a042b?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "a4",
      title: "Energy Traders Shift to Renewables",
      dek: "Clean power contracts rewrite the playbook for commodity desks.",
      content:
        "Renewable energy derivatives are drawing both traditional commodity traders and new entrants. Structured contracts are evolving to match fluctuating production, while insurers reprice coverage around climate volatility.",
      author: "Nora Davis",
      date: "2024-11-15",
      category: "Energy",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=1200&q=80"
    }
  ],
  podcasts: [
    {
      id: "p1",
      title: "Z Journal: Equity Outlook",
      description:
        "A 12-minute briefing on how earnings season is reshaping investor sentiment and the sectors to watch.",
      host: "Arielle Santos",
      date: "2024-11-18",
      videoUrl: "https://www.youtube.com/embed/r44RKWyfcFw"
    },
    {
      id: "p2",
      title: "Frontline: The New Trade Routes",
      description:
        "We sit down with logistics leaders on the shift toward regional manufacturing and new shipping alliances.",
      host: "Jonah Blake",
      date: "2024-11-17",
      videoUrl: "https://www.youtube.com/embed/7U5yA1Mj9_o"
    }
  ],
  images: [
    {
      id: "g1",
      title: "Closing bell",
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "g2",
      title: "Newsroom",
      url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "g3",
      title: "City at dawn",
      url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: "g4",
      title: "Studio lights",
      url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80"
    }
  ],
  employees: [
    {
      id: "e1",
      name: "Rhea Kapoor",
      role: "Editor-in-Chief",
      bio: "Leads the editorial vision with a focus on global markets and investigative reporting.",
      image: "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "e2",
      name: "Victor Hale",
      role: "Head of Podcasts",
      bio: "Shapes narrative audio formats and hosts the weekly flagship briefing.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80"
    },
    {
      id: "e3",
      name: "Zara Patel",
      role: "Visual Editor",
      bio: "Curates data visuals and the gallery experience for the newsroom.",
      image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=80"
    }
  ]
};
