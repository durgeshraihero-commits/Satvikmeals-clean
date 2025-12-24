export async function POST(req) {
  const body = await req.json();

  // body.image should be a URL for now
  if (!body.image) {
    return Response.json({ error: "Image required" }, { status: 400 });
  }

  return Response.json({
    imageUrl: body.image
  });
}
