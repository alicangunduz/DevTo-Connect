import Link from "next/link";
import React from "react";

async function index({ key, item }) {
  // Date can be formatted day month name year
  // 2023-03-05T22:22:05.630Z

  const date = new Date(item.published_at).toLocaleDateString(
    process.env.DATE_FORMAT,
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const readingMinute = item.reading_time_minutes;
  return (
    <>
      <article className="mb-8" key={key}>
        <Link href={item.slug} key={key}>
          <h4 className="text-xl font-bold mb-4">{item.title}</h4>
        </Link>
        <p className="text-gray-700 mb-4">{item.description}</p>
        <p className="text-sm text-gray-500">
          {date} • {readingMinute} min read
        </p>
      </article>
    </>
  );
}

export default index;
