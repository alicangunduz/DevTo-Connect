import { AvatarImage, Avatar } from "@/components/ui/avatar";

async function getUser() {
  const myHeaders = new Headers();
  myHeaders.append("api-key", process.env.API_KEY);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch("https://dev.to/api/users/me", requestOptions);
  return data.json();
}

export default async function Component() {
  const user = await getUser();
  return (
    <div className="bg-[#1a1a1a] text-white">
      <div className="max-w-4xl mx-auto pt-12 pb-10 px-6">
        <div className="flex flex-col items-center">
          <Avatar className="mb-6 w-24 h-24">
            <AvatarImage alt={user.name} src={user.profile_image} />
          </Avatar>
          <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
          <p className="text-center text-white mb-6">{user.summary || ""}</p>
        </div>
      </div>
    </div>
  );
}
