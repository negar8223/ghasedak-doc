import { HttpMethod } from "../types";

const methodColor: Record<HttpMethod, string> = {
  GET: "var(--green-500)",
  POST: "var(--green-500)",
  PUT: "var(--yellow-400)",
  PATCH: "var(--violet-400)",
  DELETE: "var(--red-500)",
  OPTIONS: "var(--slate-300)",
  HEAD: "var(--slate-300)"
};

type Props = {
  method: HttpMethod;
};

const Badge = ({ method }: Props) => (
  <span
    className="method-badge"
    style={{ background: methodColor[method], color: "#0b1224" }}
  >
    {method}
  </span>
);

export default Badge;