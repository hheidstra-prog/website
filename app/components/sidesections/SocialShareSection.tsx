import { SocialShareSectionType } from "@/app/lib/types";
import { LinkedInIcon, MediumIcon, RedditIcon, XIcon } from "../icons/SocialIcons";

interface SocialShareProps {
  data: SocialShareSectionType;
  url: string | null | undefined;
}

export default function SocialShareSection({ data, url }: SocialShareProps) {

  if (url === null) {
    return null;
  }

  const { title, subtitle } = data;

    return (
      <div className="p-2  bg-gray-50">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{subtitle}</p>        
        <div className="flex justify-between">
          <a
            href={`https://linkedin.com/shareArticle?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-blue-600"
          >
            <LinkedInIcon className="w-6 h-6" />
            <span className="text-sm mt-1">LinkedIn</span>
          </a>
          <a
            href={`https://twitter.com/intent/tweet?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-blue-600"
          >
            <XIcon className="w-6 h-6" />
            <span className="text-sm mt-1">Twitter</span>
          </a>
          <a
            href={`https://reddit.com/submit?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-blue-600"
          >
            <RedditIcon className="w-6 h-6" />
            <span className="text-sm mt-1">Reddit</span>
          </a>
          <a
            href={`https://medium.com/share?url=${url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center text-blue-600"
          >
            <MediumIcon className="w-6 h-6" />
            <span className="text-sm mt-1">Medium</span>
          </a>
        </div>
      </div>
    );
  }