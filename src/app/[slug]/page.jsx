import React from "react";
import "./slug.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import Tag from "@/components/custom/Tag";

async function getUser() {
  const myHeaders = new Headers();
  myHeaders.append("api-key", process.env.API_KEY);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data_user = await fetch("https://dev.to/api/users/me", requestOptions, {
    cache: "no-store",
  });
  return data_user.json();
}

async function getArticle(username, slug) {
  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };
  const dataArticle = await fetch(
    `https://dev.to/api/articles/${username}/${slug}`,
    requestOptions,
    { cache: "no-store" }
  );
  return dataArticle.json();
}

async function page({ params: slug }) {
  const user = await getUser();
  const usernames = user.username;
  const slugs = slug.slug;
  const article = await getArticle(usernames, slugs);
  const content = article.body_html.replace(
    /<div class="highlight__panel js-actions-panel">[\s\S]*?<\/div>/g,
    ""
  );

  return (
    <>
      <div className="max-w-4xl mx-auto pt-1">
        <div className="flex flex-col items-center border-b pb-2 pt-1">
          <Link href="/">
            <p className="text-blue-500 text-base flex block">
              {"<- Back Home"}
            </p>
          </Link>
        </div>
      </div>
      <main className="flex flex-col">
        <div className="container px-4 md:px-6 mx-auto max-w-14xl">
          <div className="grid gap-8 items-center">
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
          </div>
        </div>
      </main>
    </>
  );
}

export default dynamic(() => Promise.resolve(page), { ssr: false });
