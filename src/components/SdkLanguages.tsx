import { useMemo, useState } from "react";

type CodeBlock = {
  title: string;
  lines: string[];
};

type LanguageTab = {
  key: string;
  name: string;
  icon: string;
  codeBlocks: CodeBlock[];
};

const LANGUAGES: LanguageTab[] = [
  {
    key: "ruby",
    name: "Ruby",
    icon: "💎",
    codeBlocks: [{ title: "GEM", lines: ["gem install ghasedak"] }],
  },
  {
    key: "python",
    name: "Python",
    icon: "🐍",
    codeBlocks: [{ title: "PIP", lines: ["pip install ghasedak"] }],
  },
  {
    key: "php",
    name: "PHP",
    icon: "🐘",
    codeBlocks: [
      { title: "COMPOSER", lines: ["composer require ghasedak-php"] },
    ],
  },
  {
    key: "java",
    name: "Java",
    icon: "☕",
    codeBlocks: [
      {
        title: "MAVEN",
        lines: [
          "<dependency>",
          "  <groupId>com.ghasedak</groupId>",
          "  <artifactId>ghasedak-java</artifactId>",
          "  <version>1.0.0</version>",
          "</dependency>",
        ],
      },
      {
        title: "GRADLE",
        lines: ['implementation "com.ghasedak:ghasedak-java:1.0.0"'],
      },
    ],
  },
  {
    key: "node",
    name: "Node.js",
    icon: "🟢",
    codeBlocks: [{ title: "NPM", lines: ["npm i ghasedak"] }],
  },
  {
    key: "go",
    name: "Go",
    icon: "🌀",
    codeBlocks: [{ title: "GO GET", lines: ["go get ghasedak"] }],
  },
  {
    key: "dotnet",
    name: ".NET",
    icon: "🟦",
    codeBlocks: [{ title: "DOTNET", lines: ["dotnet add package Ghasedak"] }],
  },
];

export const SdkLanguages = () => {
  const [activeKey, setActiveKey] = useState<string>("java");

  const activeLanguage = useMemo(
    () => LANGUAGES.find((lang) => lang.key === activeKey) ?? LANGUAGES[0],
    [activeKey]
  );

  return (
    <div className="sdk-languages" dir="ltr">
      <div className="sdk-languages__header">
        <div className="sdk-languages__title">Client Libraries</div>
        <div className="sdk-languages__brand">Ghasedak SDK</div>
      </div>

      <div
        className="sdk-languages__tabs"
        role="tablist"
        aria-label="Ghasedak SDK client libraries"
      >
        {LANGUAGES.map((lang) => {
          const isActive = lang.key === activeLanguage.key;

          return (
            <button
              key={lang.key}
              type="button"
              className={`sdk-languages__tab ${isActive ? "is-active" : ""}`}
              onClick={() => setActiveKey(lang.key)}
              role="tab"
              aria-selected={isActive}
              aria-controls={`sdk-tab-${lang.key}`}
            >
              <span className="sdk-languages__tab-icon" aria-hidden="true">
                {lang.icon}
              </span>
              <span className="sdk-languages__tab-label">{lang.name}</span>
            </button>
          );
        })}
      </div>

      <div
        className="sdk-languages__panel"
        id={`sdk-tab-${activeLanguage.key}`}
        role="tabpanel"
      >
        <div className="sdk-languages__code-grid">
          {activeLanguage.codeBlocks.map((block) => (
            <div key={block.title} className="sdk-languages__code-block">
              <div className="sdk-languages__code-title">{block.title}</div>
              <pre>
                <code>{block.lines.join("\n")}</code>
              </pre>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
