import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/custom/Header";

const inter = Inter({ subsets: ["latin"] });

async function getUser() {
  const myHeaders = new Headers();
  myHeaders.append("api-key", process.env.API_KEY);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  const data = await fetch("https://dev.to/api/users/me", requestOptions, {
    cache: "no-store",
  });
  return data.json();
}

const datajson = await getUser();

const name = datajson.name;
const description = datajson.summary;

export const metadata = {
  title: name,
  description: description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        {children}
      </body>
    </html>
  );
}
