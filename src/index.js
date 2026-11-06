export default {
  async fetch(request) {
    return new Response("Museshare site running", {
      headers: {
        "content-type": "text/plain"
      }
    })
  }
}
