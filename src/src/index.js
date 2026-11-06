export default {
  async fetch(request) {
    return new Response("Museshare site is running", {
      headers: {
        "content-type": "text/plain"
      }
    })
  }
}
