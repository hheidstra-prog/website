export const getAllPostsQuery = `
  *[_type == "post"] {
    _id,
    title,
    slug
  }
`;

export const paginatedPostsQuery = `
  *[_type == "post"] | order(_createdAt desc) [$start...$end] {
    _id,
    title,
    slug
  }
`;

export const postsByCategoryQuery = `
  *[_type == "post" && $categoryId in categories[]._ref] | order(_createdAt desc) {
    _id,
    title,
    slug
  }
`;

export const getPostsQuery = `
  *[_type == "post"] {
    _id,
    title,
    slug,
    body
  }
`;

// queries.ts
export const fetchLast10PostsQuery = `
  *[_type == "post"] | order(_createdAt desc)[0...10] {
    _id,
    title,
    slug,
    _createdAt,
    mainImage {
      asset -> {
        url
      },
      alt
    },
    body
  }
`;

export const fetchPostBySlug = `
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      body,
      mainImage {
        asset -> {
          url
        },
        alt
      },
      _createdAt,
      metaTitle,
      metaDescription,
      author -> {
        name,
        image {
          asset -> {
            url
          }
        }
      },
      categories[] -> {
        _id,
        title,
        slug
      },
      "slug": slug      
    }
  `;


// project queties
export const fetchProjectsQuery = `
  *[_type == "project"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    projecturl,
    logo {
      asset -> {
        url
      },
      alt
    },
    date,
    tags
  }
`;

export const fetchProjectBySlug = `
    *[_type == "project" && slug.current == $slug][0] {
      title,
      description,
      projecturl,
      image {
        asset -> {
          url
        },
        alt
      },
      date,
      tags,
      body,
      metaTitle,
      metaDescription      
    }
  `;

  // technologies queries
export const fetchTechnologiesQuery = `
  *[_type == "technology"] | order(date desc) {
    _id,
    title,
    slug,
    description,
    logo {
      asset -> {
        url
      },
      alt
    },  
    website,
    tags
}
`;

export const fetchTechnologyBySlug = `
    *[_type == "technology" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      description,
      logo {
        asset -> {
          url
        },
        alt
      },  
      website,
      tags,  
      body,
      metaTitle,
      metaDescription          
    }
  `;
