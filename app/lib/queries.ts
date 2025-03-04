
// page

export const fetchPageWithSectionsQuery = `
  *[_type == "page" && slug.current == $slug && language == $language][0] {
    _key,
    _id,
    title,
    slug,
    metaTitle,
    metaDescription,
    language,
    "sections": sections[]->{
      _key,
      _id,
      _type,
      language,
      _type == "textSection" => {
        _key,
        _type,
        title,
        content
      },
      _type == "heroSection" => {
        _key,
        _type,
        heading,
        introText,
        callToActionTitle,
        emailPlaceholder,
        websitePlaceholder,
        buttonLabel,
        textBelowFields,
        logosLabel,
        image {
          asset->{
            url
          }
        }
      },
      _type == "featureSection" => {
        _key,
        _type,
        title,
        introText,
        backgroundColor,
        image {
          asset->{
            url,
            metadata { lqip }
          }
        },        
        cards[] {
          icon,
          title,
          content
        }
      },
      _type == "latestArticlesSection" => {
        _key,
        _type,
        title,
        subtitle
      },
      _type == "newsletterSection" => {
        _key,
        _type,
        title,
        subtitle,
        actiontext,
        buttonLabel,
        emailPlaceholder
      },
      _type == "faqSection" => {
        _key,
        _type,
        title,
        subtitle,
        faqs[] {
          question,
          answer
        }
      },
      _type == "ctaSection" => {
        _key,
        _type,
        title,
        subtitle,
        buttonLabel,
        buttonLink
      },
      _type == "contactFormSection" => {
        _key,
        _type,
        title,
        name,
        surname,
        phone,
        email,
        message,
        button
      },      
      _type == "testimonialSection" => {
        _key,
        _type,
        title,
        testimonials[] {
          name,
          role,
          image {
            asset->{
              url
            }
          },
          quote
        }
      },
      _type == "allArticlesSection" => {
        _key,
        _type,
        title
      },
      _type == "aiInsightsSection" => {
        _key,
        _type,
        title,
        insights[] {
          header,
          insight
        }
      },  
      _type == "aiFactsSection" => {
        _key,
        _type,
        title,
        subtitle,
        facts[] {
          title,
          value,
          suffix
        }
      },   
      _type == "aboutUsSection" => {
        _key,
        _type,
        title,
        subtitle,
        content,
        statistics[] {
          value,
          label
        },
        images[] {
          _key,
          asset->{
            url
          },
          alt
        }
      },
      _type == "meetTheTeamSection" => {
        _key,
        _type,      
        title,
        subtitle,
        content,
        image {
          asset->{
            url,
            metadata { lqip }
          }
        },
        cta {
          text,
          link
        }
      },
      _type == "aiAgentsSection" => {
        _key,
        _type,      
        title,
        subtitle,
        cards[] {
          title,
          text,
          image {
            asset->{
              url,
              metadata { lqip }
            },
            alt
          }
        }
      },
      _type == "aiWorkflowSection" => {
        _key,
        _type,      
        title,
        subtitle,
        cards[] {
          title,
          text,
          image {
            asset->{
              url,
              metadata { lqip }
            },
            alt
          }
        }
      },
      _type == "useCasesSection" => {  
        _key,
        _type,    
        title,
        subtitle,
        buttonText,
        categories[]->{
          _id,
          _key,
          title
        },
      },
      _type == "scheduleCallFormSection" => {
        _key,
        _type,
        title,
        name,
        surname,
        phone,
        email,
        message,
        calltext,
        button
      },                  
    }
  }
`;

export const fetchAllUseCasesQuery = `
  *[_type == "useCase" && language == $language] {
    _id,
    title,
    slug,
    description,
    image {
      asset->{
        url,
        metadata { lqip }
      }
    },
    tags[]->{
      _id,
      title
    },
    buttonText,
    buttonLink
  }
`;

export const fetchSingleUseCaseQuery = `
  *[_type == "useCase" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    image {
      asset->{ url },
      alt
    },
    tags[]->{ _id, title }
  }
`;



export const fetchPageQuery = `
  *[_type == "page" && language == $language && slug.current == $slug][0] {
    _id,
    title,
    description,
    metaTitle,
    metaDescription,
    contactFormPlaceholders {
      name,
      surname,
      phone,
      email,
      message,
      button
    }
  }
`;


// placeholders for the contact form from settings
export const fetchSettingsQuery = `
  *[_type == "settings" && language == $language][0] {
    contactFormPlaceholders {
      name,
      surname,
      phone,
      email,
      message,
      button
    }
  }
`;


// posts
export const fetchLatestPostsQuery = `
  *[_type == "post" && language == $language] | order(_createdAt desc)[0...6] {
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
    body,
    "excerptAuto": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."

  }
`;

export const fetchBlogPostsQuery = `
  *[_type == "post" && language == $language] | order(publishedAt desc) {
    _id,
    title,
    slug,
    _createdAt,
    _publishedAt,
    mainImage {
      asset->{
        url,
        metadata { lqip } // Low-quality placeholder for images
      }
    },
    "excerptAuto": array::join(string::split((pt::text(body)), "")[0..150], "") + "..."
    
  }
`;

export const fetchPostQuery = `
  *[_type == "post" && slug.current == $slug && language == $language][0] {
    _id,
    title,
    slug,
    _createdAt,    
    body,
    mainImage {
      asset->{
        url,
        metadata { lqip }
      }
    },
    publishedAt,
    metaTitle,
    metaDescription,
    author-> {
      name,
      image {
        asset->{
          url,
          metadata { lqip }
        }
      },
      bio
    },
    categories[]-> {
      title
    }   
  }
`;


export const fetchPostWithGlobalSectionsQuery = `
  {
    "post": *[_type == "post" && slug.current == $slug && language == $language][0] {
      _id,
      title,
      subtitle,
      slug,
      body,
      mainImage {
        asset->{
          url,
          metadata { lqip }
        }
      },
      _createdAt,
      _publishedAt,
      metaTitle,
      metaDescription,
      author-> {
        name,
        image {
          asset->{
            url,
            metadata { lqip }
          }
        }
      },
      categories[]-> {
        title,
        slug
      },
      "bottomSections": bottomSections[]->{
        _type,
        _key,
        ...
      },
      "sideSections": sideSections[]->{
        _type,
        _key,
        ...,
        includedHeadings
      },
    },
  }
`;




// menu
export const fetchMenuQuery = `
  *[_type == "menu" && id == $menuId && language == $language][0] {
    _id,
    title,
    id,
    language,
    items[]{
      label,
      link,
      subMenu[]{
        label,
        link
      }
    }
  }
`;



// old

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
