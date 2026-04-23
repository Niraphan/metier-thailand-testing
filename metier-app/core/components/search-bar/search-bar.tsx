"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

interface SearchBarProps {
  defaultValue?: string
}

export const SearchBar = ({
  defaultValue = "",
}: SearchBarProps) => {
  const router = useRouter()
  const [keyword, setKeyword] = useState(defaultValue)

  const handleSearch = () => {
    const params = new URLSearchParams()

    if (keyword.trim()) {
      params.set("name", keyword.trim())
    }

    params.set("page", "1")

     router.replace(`/?${params.toString()}`)
  }

  return (
    <div className="flex w-full  gap-3">
      <input
        type="text"
        placeholder="ค้นหาชื่อ Blog"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="flex-1 rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-primary bg-white"
      />
      <button
        onClick={handleSearch}
        className="rounded-xl bg-primary px-6 py-3 font-medium text-white transition hover:opacity-90"
      >
        Search
      </button>
    </div>
  )
}