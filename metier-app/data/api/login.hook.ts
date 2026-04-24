import axios from "axios"
import { useMutation } from "@tanstack/react-query"

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_ENDPOINT


export const useLogin = () => {
    return useMutation({
        mutationFn: ({ username, password }: { username: string, password: string }) => axios.post(`${baseUrl}/login`, {
            username,
            password
        })
    })
}