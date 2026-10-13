import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { resolveAll } from "@/content/media";
import WorkGrid from "@/components/WorkGrid";
export const metadata: Metadata = { title: "Selected work", description: "Film, video editing, photography, events and experiments from ZIZU.archive." };
export default function Work() {
  return <section className="s"><h1 className="h">Selected work</h1><WorkGrid items={resolveAll(projects)} /></section>;
}
