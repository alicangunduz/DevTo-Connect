import React from "react";
import "./slug.css";
import Link from "next/link";
import dynamic from "next/dynamic";
import ArticlePage from "@/components/custom/ArticlePage";

async function getUser() {
  const myHeaders = new Headers();
  myHeaders.append("api-key", process.env.API_KEY);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data_user = await fetch("https://dev.to/api/users/me", requestOptions);
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
  let slugs = slug.slug;
  let article = await getArticle(usernames, slugs);

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
            <ArticlePage article={article} />
          </div>
        </div>
      </main>
    </>
  );
}

export const revalidate = 1;
export default dynamic(() => Promise.resolve(page), { ssr: false });
