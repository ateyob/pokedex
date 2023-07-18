import { NextResponse } from "next/server";

import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/lib/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  console.log(body + "Erat bela");
  console.log(body.id);
  // console.log({ ...body });

  const { data } = body;
  console.log(data.name, data.url);
  const value = {
    name: data.name,
    url: data.url,
  };

  console.log(value + "the abeni value is");

  let favoriteIds;
  if (Array.isArray(currentUser.favoriteIds)) {
    favoriteIds = [...(currentUser.favoriteIds || [])];
  }

  // favoriteIds.push(value);

  if (!favoriteIds) {
    return null;
  }

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: [...favoriteIds, { name: data.name, url: data.url }],
    },
  });

  return NextResponse.json(user);
}

interface IParams {
  name: string;
}
export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  const data = await request.json();
  if (!currentUser) {
    return NextResponse.error();
  }
  let favoriteIds;
  if (Array.isArray(currentUser.favoriteIds)) {
    favoriteIds = [...(currentUser.favoriteIds || [])];
  }
  if (!favoriteIds) {
    return null;
  }
  favoriteIds = favoriteIds.filter(
    (name: any) => JSON.stringify(name.name).slice(1, -1) !== data.name
  );

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds,
    },
  });

  return NextResponse.json("hi");
}
