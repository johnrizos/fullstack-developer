type TrainingLabProps = {
  title?: string;
  outcomes: string[];
  scenario: string;
  steps: string[];
  checkpoints: string[];
  mistakes: string[];
  mastery: string;
};

function SectionList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h4 className="text-base font-bold text-gray-900 dark:text-gray-100">{title}</h4>
      <ul className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item} className="flex gap-2 text-sm leading-6 text-gray-700 dark:text-gray-300">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrainingLab({
  title = "Training lab",
  outcomes,
  scenario,
  steps,
  checkpoints,
  mistakes,
  mastery,
}: TrainingLabProps) {
  return (
    <section className="my-10 rounded-xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-950 dark:bg-blue-950/30">
      <div className="mb-5">
        <p className="text-sm font-bold uppercase tracking-wide text-blue-700 dark:text-blue-400">Practice mode</p>
        <h2 className="mt-1 text-2xl font-extrabold text-blue-950 dark:text-blue-100">{title}</h2>
        <p className="mt-3 text-base leading-7 text-blue-950 dark:text-blue-200">{scenario}</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="rounded-lg bg-white p-4 dark:bg-gray-900">
          <SectionList title="Στόχοι" items={outcomes} />
        </div>
        <div className="rounded-lg bg-white p-4 dark:bg-gray-900">
          <SectionList title="Βήματα" items={steps} />
        </div>
        <div className="rounded-lg bg-white p-4 dark:bg-gray-900">
          <SectionList title="Checkpoints" items={checkpoints} />
        </div>
        <div className="rounded-lg bg-white p-4 dark:bg-gray-900">
          <SectionList title="Συχνά λάθη" items={mistakes} />
        </div>
      </div>

      <div className="mt-5 rounded-lg border border-green-200 bg-green-50 p-4 dark:border-green-900 dark:bg-green-950/40">
        <h4 className="font-bold text-green-900 dark:text-green-300">Definition of done</h4>
        <p className="mt-2 text-sm leading-6 text-green-900 dark:text-green-200">{mastery}</p>
      </div>
    </section>
  );
}
