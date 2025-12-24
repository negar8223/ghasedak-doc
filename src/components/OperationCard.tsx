import { useMemo, useState } from "react";
import Badge from "./Badge";
import CodeBlock from "./CodeBlock";
import ParamTable from "./ParamTable";
import { ApiOperation } from "../types";

type Props = {
  operation: ApiOperation;
  baseUrl: string;
};

const stringify = (payload: unknown) => {
  if (payload === undefined || payload === null) return "";
  if (typeof payload === "string") return payload;
  return JSON.stringify(payload, null, 2);
};

const OperationCard = ({ operation, baseUrl }: Props) => {
  const [activeLang, setActiveLang] = useState(
    operation.codeSamples?.[0]?.lang ?? ""
  );
  const fullPath = useMemo(
    () => `${baseUrl.replace(/\/$/, "")}${operation.path}`,
    [baseUrl, operation.path]
  );

  const activeSample =
    operation.codeSamples?.find((s) => s.lang === activeLang) ??
    operation.codeSamples?.[0];

  return (
    <article className="operation-card" id={operation.id}>
      <div className="operation-card__head">
        <div className="operation-card__method">
          <Badge method={operation.method} />
          <span className="operation-card__path">{fullPath}</span>
        </div>
        <div className="operation-card__summary">{operation.summary}</div>
        {operation.description && (
          <p className="operation-card__description">{operation.description}</p>
        )}
      </div>

      <ParamTable parameters={operation.parameters} />

      {operation.requestBody && (
        <CodeBlock
          title="Request Body"
          label={operation.requestBody.contentType}
          code={stringify(operation.requestBody.example)}
        />
      )}

      {operation.responses?.map((resp) => (
        <CodeBlock
          key={resp.status}
          title={`Response ${resp.status}`}
          label={resp.contentType}
          code={stringify(resp.example)}
        />
      ))}

      {operation.codeSamples && operation.codeSamples.length > 0 && (
        <div className="code-tabs">
          <div className="code-tabs__tabs">
            {operation.codeSamples.map((sample) => (
              <button
                key={sample.lang}
                className={`ghost-btn ${
                  activeSample?.lang === sample.lang ? "ghost-btn--active" : ""
                }`}
                onClick={() => setActiveLang(sample.lang)}
              >
                {sample.label ?? sample.lang}
              </button>
            ))}
          </div>
          {activeSample && (
            <CodeBlock
              code={activeSample.code}
              label={activeSample.label ?? activeSample.lang}
            />
          )}
        </div>
      )}
    </article>
  );
};

export default OperationCard;
