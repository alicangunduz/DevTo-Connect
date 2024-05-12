"use client";
import React, { useState, useEffect } from "react";
import Tag from "@/components/custom/Tag";

function ArticlePage({ article }) {
  const [content, setContent] = useState("");
  useEffect(() => {
    setContent(
      article.body_html?.replace(
        /<div class="highlight__panel js-actions-panel">[\s\S]*?<\/div>/g,
        ""
      )
    );
  }, [article.body_html]);

  return (
    <section className="w-full pb-20 pt-10 text-wrap  md:pb-32">
      <h2
        className="text-3xl font-bold mb-4 justify-center text-center"
        id="posts-heading"
      >
        {article.title}
      </h2>
      <div className="grid gap-8">
        {
          <div
            className="prose lg:prose-lg  article-content"
            dangerouslySetInnerHTML={{ __html: content }}
          ></div>
        }
      </div>
      <div className="flex flex-wrap justify-center">
        {article.tags?.map((tag) => (
          <Tag key={tag} tag={tag} />
        ))}
      </div>
    </section>
  );
}

export default ArticlePage;
