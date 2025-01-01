import { PortableTextBlock, Slug } from "@sanity/types";

  //export interface Post {
  //  _id: string;
  //  title: string;
  //  slug: Slug;
  //}

  export interface SanityImage {
    asset: {
      url: string;
    };
    alt?: string;
  }
  
  export interface Author {
    name: string;
    image?: SanityImage;
  }
  
  export interface Category {
    _id: string;
    title: string;
    slug: Slug;
  }
  
  export interface Post {
    _id: string;
    title: string;
    body: PortableTextBlock[]; 
    mainImage?: SanityImage;
    metaTitle?: string;
    metaDescription?: string;
    author?: Author;
    categories?: Category[];
    slug: Slug;
    _createdAt: string;
  }

  // project

export interface Project {
  _id: string;
  title: string;
  slug: Slug;
  description: string;
  mainImage?: SanityImage;
  projecturl: string;
  logo?:SanityImage;  
  date: string; // ISO date string
  tags?: string[];
  body: PortableTextBlock[]; 
  metaTitle?: string;
  metaDescription?: string;  
}

// technology
export interface Technology {
  _id: string;
  title: string;
  slug: Slug;
  description: string;  
  logo?: SanityImage;
  website: string;
  date: string; // ISO date string
  tags?: string[];
  body: PortableTextBlock[]; 
  metaTitle?: string;
  metaDescription?: string;  
}

