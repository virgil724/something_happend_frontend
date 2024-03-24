import { useJwt } from "@vueuse/integrations/useJwt"

export default defineNuxtRouteMiddleware((to, from) => {
    const { payload } = useJwt(useSessionStorage('access_token', "").value)
    console.log(payload)
    if (!payload.value.admin) {
        return navigateTo('/')
    }
})