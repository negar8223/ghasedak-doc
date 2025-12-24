import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import Badge from "./Badge";
import { HttpMethod } from "../types";

type Props = {
  method: HttpMethod;
  endpoint: string;
};

const OperationBox = ({ method, endpoint }: Props) => {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(endpoint);
      setCopied(true);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = window.setTimeout(() => setCopied(false), 6000);
    } catch (err) {
      console.error("Failed to copy endpoint", err);
    }
  };

  return (
    <div className="operation-box">
      <Badge method={method} />
      <code className="operation-box__endpoint">{endpoint}</code>
      <button
        className={`ghost-btn ${copied ? "ghost-btn--active" : ""}`}
        onClick={handleCopy}
        aria-label={copied ? "کپی شد" : "کپی"}
      >
        <FontAwesomeIcon icon={copied ? faCheck : faCopy} />
      </button>
    </div>
  );
};

export default OperationBox;