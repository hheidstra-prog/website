import React from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
//import { tomorrowNightBright } from 'react-syntax-highlighter/dist/esm/styles/hljs'

interface CodeBlockProps {
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, language }) => {

    return (
      <SyntaxHighlighter
        showLineNumbers={true}
        showInlineLineNumbers={true}
        language={language}
        style={atomOneDark}
        customStyle={{
          padding: '1em',
          marginBottom: '2em',
        }}
      >
        {code}
      </SyntaxHighlighter>
    )
  }
  
  export default CodeBlock