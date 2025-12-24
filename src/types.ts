export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "OPTIONS" | "HEAD";

export type ApiParameterLocation = "path" | "query" | "header";

export interface ApiParameter {
  name: string;
  in: ApiParameterLocation;
  required?: boolean;
  type?: string;
  description?: string;
  example?: string | number | boolean;
}

export interface ApiRequestBody {
  description?: string;
  contentType?: string;
  example?: unknown;
}

export interface ApiResponse {
  status: number | "default";
  description?: string;
  contentType?: string;
  example?: unknown;
}

export interface CodeSample {
  lang: string;
  label?: string;
  code: string;
}

export interface ApiOperation {
  id: string;
  method: HttpMethod;
  path: string;
  summary: string;
  description?: string;
  parameters?: ApiParameter[];
  requestBody?: ApiRequestBody;
  responses?: ApiResponse[];
  codeSamples?: CodeSample[];
}

export interface ApiTag {
  name: string;
  description?: string;
  operations: ApiOperation[];
}

export interface ApiMeta {
  title: string;
  version: string;
  baseUrl: string;
  intro?: string;
}

export interface ApiSpec {
  meta: ApiMeta;
  tags: ApiTag[];
}