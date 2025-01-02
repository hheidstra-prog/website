import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID, // Replace with your project ID
  dataset: process.env.SANITY_DATASET,     // Replace with your dataset
  apiVersion: "2023-01-01",                // Use the date of your API version
  useCdn: false,                           // Set to false for fresh content on SSR
});

// Set up the image URL builder
const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}