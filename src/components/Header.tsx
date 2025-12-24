import { useState } from "react";
import { ApiMeta } from "../types";

type Props = {
  meta: ApiMeta;
};

const Header = ({ meta }: Props) => {
  const [copied, setCopied] = useState(false);

  const copyBaseUrl = async () => {
    try {
      await navigator.clipboard.writeText(meta.baseUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <header className="hero">
      <div className="hero__badge">API Reference</div>
      <div className="hero__title">
        <div>
          <h1>{meta.title}</h1>
          <p>{meta.intro}</p>
        </div>
        <div className="hero__version">Version {meta.version}</div>
      </div>
      <div className="hero__baseurl">
        <span>{meta.baseUrl}</span>
        <button className="ghost-btn" onClick={copyBaseUrl}>
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </header>
  );
};

export default Header;
