import { useState } from "react";

type Props = {
  code: string;
  label?: string;
  title?: string;
  inline?: boolean;
};

const CodeBlock = ({ code, label, title, inline }: Props) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="code-block">
      <div className="code-block__bar">
        <div className="code-block__title">
          {title && <span>{title}</span>}
          {label && <span className="code-block__pill">{label}</span>}
        </div>
        <button className="ghost-btn" onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre>
        <code>{code}</code>
      </pre>
    </div>
  );
};

export default CodeBlock;
