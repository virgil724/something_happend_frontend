import type { RemovableRef } from "@vueuse/shared"

export const check_auth = async () => {

  const token = useSessionStorage('access_token', '')
  const refreshToken = useLocalStorage('refresh_token', '')

  if (!refreshToken.value) {
    return false
  }

  try {
    await validateToken(token.value)
    return true
  } catch (err) {
    return await refreshTokens(refreshToken, token)
  }

}

const validateToken = async (token: string) => {
  await $fetch("token/validate/", {
    method: "POST",
    body: { token }
  })
}

const refreshTokens = async (refreshToken: RemovableRef<string>, token: RemovableRef<string>) => {

  try {
    const { access, refresh } = await $fetch("token/refresh/", {
      method: "POST",
      body: { refresh: refreshToken.value }
    })

    token.value = access
    refreshToken.value = refresh

    return true

  } catch (err) {
    return false
  }

} 

export const set_authtoken = (access: string, refresh: string) => {
  const token = useSessionStorage('access_token', '')
  const refreshToken = useLocalStorage('refresh_token', '')
  token.value = access
  refreshToken.value = refresh

}