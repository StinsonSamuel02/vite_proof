import Axios from "./axios"
import {useMutation, useQuery, useQueryClient} from "react-query"
import Cookies from "universal-cookie"

const cookies = new Cookies()

export function useIsAuthenticated() {
    return useQuery("is-authenticated", () => Axios.get("/server/accounts/session").then((resp) => resp.data), {staleTime: 5000})
}

export function useWhoAmI() {
    return useQuery("who-am-i", () => Axios.get("/server/accounts/whoami").then((resp) => resp.data), {staleTime: 5000})
}

export function useLogin(options) {
    const queryClient = useQueryClient()
    return useMutation(
        ({username, password}) => Axios.post("/server/accounts/login/", {username, password}).then((resp) => resp.data),
        {
            ...options,
            onSuccess: (data, variables, context) => {
                queryClient.setQueryData("is-authenticated", {isAuthenticated: true})
                options.onSuccess(data, variables, context)
            },
        }
    )
}

export function useRegister(options) {
    const queryClient = useQueryClient()
    return useMutation(
        ({username, password}) => Axios.post("/server/accounts/signup/", {username, password}).then((resp) => resp.data),
        {
            ...options,
            onSuccess: (data, variables, context) => {
                queryClient.setQueryData("is-authenticated", {isAuthenticated: true})
                options.onSuccess(data, variables, context)
            },
        }
    )
}

export function useLogout(options) {
    const queryClient = useQueryClient()
    return useMutation(() => Axios.post("/server/accounts/logout/").then((resp) => resp.data), {
        ...options,
        onSuccess: (data, variables, context) => {
            queryClient.setQueryData("is-authenticated", {isAuthenticated: false})
            options.onSuccess(data, variables, context)
        },
    })
}

// export function useSignup() {
//     return useMutation(({username, password}) =>
//         Axios.post("/server/accounts/signup/", {username, password}).then((resp) => resp.data)
//     )
// }
