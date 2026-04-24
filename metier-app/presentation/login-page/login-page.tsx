"use client"

import { useState } from "react"
import { TextInput } from "@/core/components/input/text-input"
import { useRouter } from "next/navigation"
import * as yup from "yup"
import { useLogin } from "@/data/api/login.hook"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"

const loginSchema = yup.object({
  username: yup.string().required("กรุณากรอกชื่อ"),
  password: yup.string().required("กรุณากรอกรหัสผ่าน"),
})

export const LoginPage = () => {
  const router = useRouter()

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  })

  const { mutateAsync: login, isPending } = useLogin()

  const handleSubmit = async () => {
    try {
      await loginSchema.validate(
        {
          username,
          password,
        },
        {
          abortEarly: false,
        },
      )

      setErrors({
        username: "",
        password: "",
      })

      const res = await login({ username, password })

      document.cookie = `admin_token=${res.data.token}; path=/; max-age=604800`

      setUsername("")
      setPassword("")

      // เปิด modal success
      setShowSuccessModal(true)

      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        const formErrors = {
          username: "",
          password: "",
        }

        error.inner.forEach((err) => {
          if (err.path) {
            formErrors[err.path as keyof typeof formErrors] = err.message
          }
        })

        setErrors(formErrors)
      }
    }
  }

  const handleBackToHomePage = () => {
    router.push("/")
  }

  return (
    <>
      <section className="h-screen w-full flex flex-col justify-center items-center">
        <div className="w-[60%] max-w-2xl bg-white rounded-xl p-8 flex flex-col gap-10 shadow-lg">
          <h1 className="text-2xl font-bold text-primary text-center">
            Admin Login
          </h1>
          <TextInput
            label="Username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={errors.username}
          />

          <TextInput
            label="Password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
          />
          <div className="flex gap-2 flex-col">
            <button
              onClick={handleSubmit}
              className="bg-primary text-white rounded-lg p-2"
              disabled={isPending}
            >
              {isPending ? "Loading..." : "Login"}
            </button>
            <button
              onClick={handleBackToHomePage}
              className="bg-black text-white rounded-lg p-2"
              disabled={isPending}
            >
              {"back to home page"}
            </button>
          </div>
        </div>
      </section>
      {showSuccessModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-black/40">
          <div className="w-[400px] rounded-2xl bg-white p-8 shadow-2xl flex flex-col items-center gap-4 animate-in fade-in zoom-in duration-300">
            <CheckCircleIcon
              sx={{
                fontSize: 80,
                color: "#22c55e",
              }}
            />

            <h2 className="text-2xl font-bold">Login Successful</h2>

            <p className="text-neutral-500 text-center">
              กำลังพาคุณไปยังหน้า Admin Panel...
            </p>
          </div>
        </div>
      )}
    </>
  )
}
