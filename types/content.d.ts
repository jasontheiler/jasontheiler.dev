import { IContentDocument } from "@nuxt/content/types/content";

type Toc = {
  id: string;
  text: string;
  depth: number;
}[];

type Post = IContentDocument & {
  title: string;
  description: string;
  tags: string[];
  image: string;
  toc: Toc;
};
