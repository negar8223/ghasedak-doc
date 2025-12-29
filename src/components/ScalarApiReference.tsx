import {
  ApiReferenceReact,
  AnyApiReferenceConfiguration,
} from "@scalar/api-reference-react";
import type { ApiSpec } from "../types";

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  spec: any;
  instanceKey?: string;
  theme: "dark" | "light";
};

const ScalarApiReference = ({ spec, instanceKey, theme }: Props) => {
  const configuration = {
    _integration: "fastify",
    spec: { content: spec },
    showSidebar: false,
    layout: "modern", // literal type درست
    hideServers: true,
    hideAuthentication: true,
    hideClientButton: true,
    showDeveloperTools: "never", // literal type درست
    darkMode: theme === "dark",
    forceDarkModeState: theme === "dark" ? "dark" : "light",
    customCss: `
      .introduction-section,
      .section-flare {
        display: none !important;
      }
      .scalar-reference-intro-server,
      .scalar-reference-intro-auth,
      .scalar-reference-intro-clients {
        display: none !important;
      }
      .narrow-references-container {
        padding-top: 0 !important;
      }
      .scalar-api-reference .address-bar,
      .scalar-api-reference .address-bar input,
      .scalar-api-reference .scalar-address-bar,
      .scalar-api-reference .scalar-address-bar input {
        box-shadow: none !important;
      }
      .section-columns {
        direction:rtl
      }
      .section-header-wrapper {
        direction:rtl
      }
      .property-heading {
        display: flex;
        justify-content: flex-start;
        direction: ltr;
      }
      .section-container{
        background-color:#0f172a;
      }
      
      
      .markdown{
        display:block;
        text-align:right;
      }
      .markdown ul {
        margin-right: 20px; 
      }
      .section-header{
        display:flex
      }
      .scalar-app .markdown p {
        text-align: right;
        direction: rtl;
        align-self: flex-start;
      }
      .code-snippet {
        text-align: left;
        direction: ltr;
      }
      .scalar-card-content {
        text-align: left;
        direction: ltr;
      }
      .operation-box__endpoint{
        text-align: left;
        direction: ltr;
      }
      
      
      
    `,
    allowedLanguages: ["Node.js", "Python"],
  } as AnyApiReferenceConfiguration; // ← cast امن به type رسمی پکیج

  return (
    <div className="scalar-api-reference">
      <ApiReferenceReact
        key={`${instanceKey || "scalar"}-${theme}`}
        configuration={configuration}
      />
    </div>
  );
};

export default ScalarApiReference;
