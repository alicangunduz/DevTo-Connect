import Article from "@/components/custom/Article";

async function getArticles() {
  const myHeaders = new Headers();
  myHeaders.append("api-key", process.env.API_KEY);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch(
    "https://dev.to/api/articles/me/published",
    requestOptions,
    { cache: "no-store" }
  );
  return data.json();
}

export default async function index() {
  const articles = await getArticles();

  return (
    <>
      <main className="flex flex-col">
        <div className="container px-4 md:px-6 mx-auto max-w-14xl">
          <div className="grid gap-8 items-center">
            <section
              aria-labelledby="posts-heading"
              className="w-full pb-20 pt-10  md:pb-32"
            >
              <h2 className="text-3xl font-bold mb-16" id="posts-heading">
                Posts
              </h2>
              <div className="grid gap-8">
                {articles.map((item) => (
                  <Article key={item.id} item={item} />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
