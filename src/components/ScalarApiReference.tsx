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
        direction:rtl;
        width:100%;
      }
      .section-content > .section-columns:first-of-type {
        display: block !important;
      }
      
      .section-content > .section-columns:not(:first-of-type) {
        display: flex;
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
        background-color:#101521;
      }
      .text-c-3 hover:text-c-1 absolute -top-2 -left-4.5 flex h-[calc(100%+16px)] w-4.5 cursor-pointer items-center justify-center pr-1.5 opacity-0 group-hover:opacity-100 focus-visible:opacity-100{
        display: none !important;
      }
      .property-example-value-list"{
        color:#0f172a;
      }
      .markdown{
        display:block;
        text-align:right;
        direction:rtl;
        
      }
      .markdown ul {
        text-align:right;
        margin-right: 20px; 
      }
      
      .section-header{
        display:flex
      }
      
      .headlessui-disclosure-button-scalar-refs-0-33{
        display:flow !important;
      }
      .scalar-app .markdown p {
        color:#c1c1c1 !important;
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
      .operation-box{
        text-align: left;
        direction: ltr;
      }
      .request-body-header{
        direction:ltr
      }
      .ghost-btn {
        text-align: right
      }
    .scalar-card-content{
      background-color:#3e444f !important;
    }
     
      .scalar-card-footer{
        background-color:#3e444f;
      }
      .scalar-card-content overflow-auto grid flex-1{
        background-color:#3e444f !important;
      }
      .scalar-code-block{
        background-color:#3e444f !important;
      }
      .operation-path{
        color:#ffffff !important;
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
