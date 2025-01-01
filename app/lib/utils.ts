
import { PortableTextBlock } from "@sanity/types";
import { format } from "date-fns";

export function extractText(portableText: PortableTextBlock[], stringcnt: number = 100): string {
  if (!Array.isArray(portableText)) {
    return ""; // Handle invalid input gracefully
  }

  return portableText
    .map((block) => {
      if (block.children && Array.isArray(block.children)) {
        return block.children
          .map((child) => ('text' in child && typeof child.text === 'string' ? child.text : ""))
          .join("");
      }
      return "";
    })
    .join(" ")
    .slice(0, stringcnt); // Limit to the specified number of characters
}


export function formatDate(dateString: string) {

  //console.log("date " +dateString);

  let date: string = "invalid";
  try{
    date = format(new Date(dateString), "dd MMM yyyy")
  }
  catch{
    date = "no date";
  }
  return date;

}
