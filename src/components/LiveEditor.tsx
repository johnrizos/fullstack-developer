"use client";

import { Sandpack } from "@codesandbox/sandpack-react";
import { useStaticMode } from "./StaticMode";

interface LiveEditorProps {
  files: Record<string, string> | string;
  template?: "vanilla" | "react" | "vanilla-ts";
}

function normalizeSandpackFiles(files: Record<string, string>, template: LiveEditorProps["template"]) {
  const normalizedFiles = Object.fromEntries(
    Object.entries(files).map(([path, code]) => [path.startsWith("/") ? path : `/${path}`, code]),
  );

  if (template === "vanilla" && normalizedFiles["/index.html"] && !normalizedFiles["/index.js"]) {
    normalizedFiles["/index.js"] = "";
  }

  return normalizedFiles;
}

export function LiveEditor({ files, template = "vanilla" }: LiveEditorProps) {
  const parsedFiles = normalizeSandpackFiles(typeof files === "string" ? JSON.parse(files) : files, template);
  const staticMode = useStaticMode();

  const staticFiles = (
    <div className={`${staticMode ? "" : "print-only "}print-block my-6 space-y-3`}>
      {Object.entries(parsedFiles)
        .filter(([, code]) => code.trim() !== "")
        .map(([path, code]) => (
          <div key={path}>
            <p className="font-mono text-sm font-semibold">{path.slice(1)}</p>
            <pre className="print-code overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-3 font-mono text-sm dark:border-gray-800 dark:bg-gray-900">{code}</pre>
          </div>
        ))}
    </div>
  );

  if (staticMode) return staticFiles;

  return (
    <>
      {staticFiles}
      <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 print:hidden dark:border-gray-800">
        <Sandpack
          template={template}
          theme="dark"
          files={parsedFiles}
          options={{
            showNavigator: false,
            showTabs: true,
            editorHeight: 400,
          }}
        />
      </div>
    </>
  );
}
