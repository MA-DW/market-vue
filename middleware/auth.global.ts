export default defineNuxtRouteMiddleware((to) => {
  const auth = useAuthStore();

  const isProtected = to.meta.auth === true;

  if (isProtected && !auth.token) {
    return navigateTo({ name: "login" });
  }
});
