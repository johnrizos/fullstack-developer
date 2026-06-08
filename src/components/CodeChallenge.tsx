"use client";

import { useMemo, useState } from "react";

type HtmlTagCheck = {
  id: string;
  label: string;
  type: "htmlTag";
  tag: string;
};

type HtmlTextCheck = {
  id: string;
  label: string;
  type: "htmlText";
  text: string;
};

type CssPropertyCheck = {
  id: string;
  label: string;
  type: "cssProperty";
  selector: string;
  property: string;
  value: string;
};

type JsIncludesCheck = {
  id: string;
  label: string;
  type: "jsIncludes";
  value: string;
};

type JsFunctionCheck = {
  id: string;
  label: string;
  type: "jsFunction";
  name: string;
};

type ChallengeCheck = HtmlTagCheck | HtmlTextCheck | CssPropertyCheck | JsIncludesCheck | JsFunctionCheck;

interface CodeChallengeProps {
  title: string;
  description: string;
  initialHtml: string;
  initialCss: string;
  initialJs?: string;
  checks: ChallengeCheck[];
}

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeCssValue(value: string) {
  return value.trim().replace(/;$/, "").toLowerCase();
}

function hasCssProperty(css: string, selector: string, property: string, value: string) {
  const blockPattern = new RegExp(`${escapeRegex(selector)}\\s*\\{([^}]*)\\}`, "i");
  const block = css.match(blockPattern)?.[1];
  if (!block) return false;

  const propertyPattern = new RegExp(`${escapeRegex(property)}\\s*:\\s*([^;]+)`, "i");
  const propertyValue = block.match(propertyPattern)?.[1];
  if (!propertyValue) return false;

  return normalizeCssValue(propertyValue) === normalizeCssValue(value);
}

function hasHtmlTag(html: string, tag: string) {
  return new RegExp(`<\\s*${escapeRegex(tag)}(?:\\s|>|/)`, "i").test(html);
}

function getHtmlText(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function hasJsFunction(js: string, name: string) {
  const escapedName = escapeRegex(name);
  return new RegExp(`function\\s+${escapedName}\\s*\\(`).test(js) || new RegExp(`const\\s+${escapedName}\\s*=`).test(js);
}

function runCheck(html: string, css: string, js: string, check: ChallengeCheck) {
  if (check.type === "cssProperty") {
    return hasCssProperty(css, check.selector, check.property, check.value);
  }

  if (check.type === "jsIncludes") {
    return js.includes(check.value);
  }

  if (check.type === "jsFunction") {
    return hasJsFunction(js, check.name);
  }

  if (check.type === "htmlTag") {
    return hasHtmlTag(html, check.tag);
  }

  return getHtmlText(html).toLowerCase().includes(check.text.toLowerCase());
}

export function CodeChallenge({
  title,
  description,
  initialHtml,
  initialCss,
  initialJs = "",
  checks,
}: CodeChallengeProps) {
  const [html, setHtml] = useState(initialHtml);
  const [css, setCss] = useState(initialCss);
  const [js, setJs] = useState(initialJs);

  const results = useMemo(
    () => checks.map((check) => ({ ...check, passed: runCheck(html, css, js, check) })),
    [checks, html, css, js],
  );
  const passedCount = results.filter((result) => result.passed).length;
  const isComplete = passedCount === checks.length;

  const preview = `<!doctype html>
<html lang="el">
  <head>
    <meta charset="utf-8" />
    <style>${css}</style>
  </head>
  <body>
    ${html}
    <script>${js}</script>
  </body>
</html>`;

  return (
    <section className="my-8 overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-600">{description}</p>
          </div>
          <span
            className={`w-fit rounded-full px-3 py-1 text-sm font-semibold ${
              isComplete ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
            }`}
          >
            {passedCount}/{checks.length} κριτήρια
          </span>
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-gray-200 lg:border-b-0 lg:border-r">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
            HTML
          </div>
          <textarea
            value={html}
            onChange={(event) => setHtml(event.target.value)}
            spellCheck={false}
            className="min-h-56 w-full resize-y bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-50 outline-none"
          />

          <div className="border-y border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
            CSS
          </div>
          <textarea
            value={css}
            onChange={(event) => setCss(event.target.value)}
            spellCheck={false}
            className="min-h-56 w-full resize-y bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-50 outline-none"
          />

          {initialJs !== "" && (
            <>
              <div className="border-y border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
                JavaScript
              </div>
              <textarea
                value={js}
                onChange={(event) => setJs(event.target.value)}
                spellCheck={false}
                className="min-h-56 w-full resize-y bg-gray-950 p-4 font-mono text-sm leading-6 text-gray-50 outline-none"
              />
            </>
          )}
        </div>

        <div className="flex flex-col">
          <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 text-sm font-semibold text-gray-700">
            Live preview
          </div>
          <iframe
            title={`${title} preview`}
            srcDoc={preview}
            sandbox={initialJs === "" ? "" : "allow-scripts"}
            className="min-h-80 w-full flex-1 bg-white"
          />

          <div className="border-t border-gray-200 p-4">
            <h4 className="font-semibold text-gray-900">Checklist</h4>
            <ul className="mt-3 space-y-2">
              {results.map((result) => (
                <li key={result.id} className="flex items-start gap-2 text-sm">
                  <span className={result.passed ? "text-green-600" : "text-gray-400"}>
                    {result.passed ? "✓" : "○"}
                  </span>
                  <span className={result.passed ? "text-green-800" : "text-gray-700"}>{result.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
