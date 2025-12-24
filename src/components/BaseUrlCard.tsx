
import { useEffect, useState } from "react";

const CopyIcon = () => (
  <svg className="base-url-card__copy-icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path d="M8 7.5a2.5 2.5 0 0 1 2.5-2.5h7A2.5 2.5 0 0 1 20 7.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 8 14.5v-7Zm2.5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1v-7a1 1 0 0 0-1-1h-7Z" />
    <path d="M6 9.5A2.5 2.5 0 0 1 8.5 7H9a1 1 0 1 1 0 2h-.5a.5.5 0 0 0-.5.5v7A1.5 1.5 0 0 0 9.5 18h6.75a1 1 0 1 1 0 2H9.5A3.5 3.5 0 0 1 6 16.5v-7Z" />
  </svg>
);

const CheckIcon = () => (
  <svg className="base-url-card__copy-icon" viewBox="0 0 24 24" role="img" aria-hidden="true">
    <path d="M9.5 15.5 6 12l1.5-1.5 2 2 7-7L18 7l-8.5 8.5Z" />
  </svg>
);

type BaseUrlCardProps = {
  url: string;
};

export const BaseUrlCard = ({ url }: BaseUrlCardProps) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch (_) {
      setCopied(false);
    }
  };

  return (
    <div className="base-url-card">
      <div className="base-url-card__top">
        <div className="base-url-card__label">
          <span>BASE URL</span>
        </div>
        <button
          type="button"
          className="base-url-card__copy"
          onClick={handleCopy}
          aria-label={copied ? "کپی شد" : "کپی"}
        >
          {copied ? <CheckIcon /> : <CopyIcon />}
          <span className="base-url-card__sr-only">{copied ? "کپی شد" : "کپی"}</span>
        </button>
      </div>

      <div className="base-url-card__value" dir="ltr">
        <span className="base-url-card__pill">BASE</span>
        <code>{url}</code>
      </div>
    </div>
  );
};
