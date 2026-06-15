"use client";

import { Sandpack } from "@codesandbox/sandpack-react";

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

  return (
    <div className="my-8 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-800">
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
  );
}
