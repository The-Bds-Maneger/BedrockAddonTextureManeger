async function GetBuffer(url = "") {
  const Fetch = (await import("node-fetch")).default;
  const Response = await Fetch(url);
  if (Response.ok) {
    return Buffer.from(await Response.arrayBuffer());
  } else {
    const Err = new Error(`${Response.status} ${Response.statusText}`);
    Err.Data = {
      data: await Response.text(),
      status: Response.status,
      statusText: Response.statusText,
    }
    throw Err;
  }
}

module.exports = {
  GetBuffer,
}