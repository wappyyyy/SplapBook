// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/storybook",
    "@nuxtjs/supabase",
    "nuxt-icon",
  ],
  runtimeConfig: {
    public: {
      supabaseUrl: "",
      supabaseKey: "",
    },
  },
  supabase: {
    redirect: false,
    // redirectOptions: {
    //   login: "/login",
    //   callback: "/confirm",
    //   include: undefined,
    //   exclude: ["/"],
    //   cookieRedirect: false,
    // },
  },
});
