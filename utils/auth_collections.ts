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
  await $fetch("/v1/token/validate/", {
    method: "POST",
    body: { token }
  })
}

const refreshTokens = async (refreshToken: RemovableRef<string>, token: RemovableRef<string>) => {

  try {
    const { access, refresh } = await $fetch("/v1/token/refresh/", {
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

export const authfetch = async (url, params) => {
  const token = useSessionStorage('access_token', '');
  const refreshToken = useLocalStorage('refresh_token', '');

  try {
    // Try the initial request with the current access token
    const response = await $fetch(url, {
      ...params,
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    });

    return response;
  } catch (error) {
    // If the request fails with a 401 Unauthorized error
    if (error.response && error.response.status === 401) {
      try {
        // Attempt to refresh the access token
        const { access, refresh } = await $fetch("/v1/token/refresh/", {
          method: "POST",
          body: { refresh: refreshToken.value }
        })

        token.value = access
        refreshToken.value = refresh

        // Retry the original request with the new access token
        const retryResponse = await $fetch(url, {
          ...params,
          headers: {
            Authorization: `Bearer ${token.value}`,
          },
        });

        return retryResponse;
      } catch (refreshError) {
        // Handle refresh token failure (e.g., log out the user)
        console.error('Refresh token error:', refreshError);

        // Redirect the user to the login page
        navigateTo('/login');
      }
    } else {
      // Re-throw the original error if it's not a 401 Unauthorized
      throw error;
    }
  }
};
export const useAuthFetch = (url, params) => {
  const token = useSessionStorage('access_token', '')
  return useFetch(url, {
    ...params, headers: { Authorization: `Bearer ${token.value}` },
  }
  )


}