export type Article = {
  id: string;
  title: string;
  dek: string;
  content: string;
  author: string;
  date: string;
  category: string;
  readTime: string;
  image: string;
};

export type Podcast = {
  id: string;
  title: string;
  description: string;
  host: string;
  date: string;
  videoUrl: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  url: string;
};

export type Employee = {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
};

export type CMSData = {
  articles: Article[];
  podcasts: Podcast[];
  images: GalleryImage[];
  employees: Employee[];
};
