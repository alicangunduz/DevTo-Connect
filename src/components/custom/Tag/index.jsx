import React from "react";
import { Badge } from "@/components/ui/badge";

function index({ tag }) {
  let tagclass = "ml-2 px-2 py-1 rounded-full text-xs font-semibold";
  let randomColorTailWindCSS = [
    "bg-blue-100 text-blue-800 hover:bg-blue-200",
    "bg-red-100 text-red-800 hover:bg-red-200",
    "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    "bg-green-100 text-green-800 hover:bg-green-200",
    "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    "bg-purple-100 text-purple-800 hover:bg-purple-200",
    "bg-pink-100 text-pink-800 hover:bg-pink-200",
    "bg-gray-100 text-gray-800 hover:bg-gray-200",
  ];

  let usecolorlist = [];

  for (let i = 0; i < tag.length; i++) {
    usecolorlist.push(
      randomColorTailWindCSS[i % randomColorTailWindCSS.length]
    );
  }

  let classname = tagclass + " " + usecolorlist.join(" ");

  return <Badge className={classname}>{tag}</Badge>;
}

export default index;
