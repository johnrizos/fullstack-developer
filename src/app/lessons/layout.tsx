import { LessonShell } from "@/components/LessonShell";

export default function LessonsLayout({ children }: { children: React.ReactNode }) {
  return <LessonShell>{children}</LessonShell>;
}
