import { useEffect } from "react";

/** 문서 제목과 메타 설명을 라우트에 맞춘다 — 공유 링크와 검색 결과에 그대로 나간다. */
export function useDocumentTitle(title: string, description?: string) {
  useEffect(() => {
    document.title = title;
    if (!description) return;

    let tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!tag) {
      tag = document.createElement("meta");
      tag.name = "description";
      document.head.appendChild(tag);
    }
    tag.content = description;
  }, [title, description]);
}
