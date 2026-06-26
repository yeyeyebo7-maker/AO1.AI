const stage = process.env.SST_STAGE || "dev"

export default {
  url: stage === "production" ? "https://ao1.ai" : `https://${stage}.ao1.ai`,
  console: stage === "production" ? "https://ao1.ai/auth" : `https://${stage}.ao1.ai/auth`,
  email: "help@anoma.ly",
  socialCard: "https://social-cards.sst.dev",
  github: "https://github.com/yeyeyebo7-maker/opencode",
  discord: "https://ao1.ai/discord",
  headerLinks: [
    { name: "app.header.home", url: "/" },
    { name: "app.header.docs", url: "/docs/" },
  ],
}
