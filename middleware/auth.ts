//проверяем, имеет объект юзер значение,
// Если нет, то на главную.
export default defineNuxtRouteMiddleware(() => {
  const user = useSupabaseUser();

  if (!user.value) {
    return navigateTo("/");
  }
});
