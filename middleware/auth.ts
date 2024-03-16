export default defineNuxtRouteMiddleware(async (to, from) => {
    const auth_stat = await check_auth()
    if (auth_stat == false) {

        return navigateTo("/Auth")
    }

})
