import { ApiParameter } from "../types";

type Props = {
  parameters?: ApiParameter[];
};

const ParamTable = ({ parameters }: Props) => {
  if (!parameters || parameters.length === 0) return null;

  return (
    <div className="param-table">
      <div className="param-table__header">Parameters</div>
      <div className="param-table__grid">
        {parameters.map((param) => (
          <div className="param-table__row" key={`${param.in}-${param.name}`}>
            <div className="param-table__name">
              <span className="param-table__pill">{param.in}</span>
              <span>{param.name}</span>
              {param.required && (
                <span className="param-table__required">required</span>
              )}
            </div>
            <div className="param-table__type">{param.type}</div>
            <div className="param-table__desc">
              {param.description}
              {param.example !== undefined && (
                <span className="param-table__example">
                  Example: {String(param.example)}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParamTable;
