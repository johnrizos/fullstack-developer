"use client";

import { Sandpack } from "@codesandbox/sandpack-react";

interface LiveEditorProps {
  files: Record<string, string> | string;
  template?: "vanilla" | "react" | "vanilla-ts";
}

export function LiveEditor({ files, template = "vanilla" }: LiveEditorProps) {
  const parsedFiles = typeof files === "string" ? JSON.parse(files) : files;

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
