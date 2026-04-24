"use client"

import React from "react"

export const TextInput = ({
  label,
  id,
  value,
  onChange,
  error,
  placeholder,
}: {
  label: string
  id: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
  placeholder?: string
}) => {
  const labelClass =
    "block text-[11px] font-bold text-neutral-400 uppercase tracking-widest mb-1.5"

  const inputClass =
    "w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-[#151515] text-sm outline-none focus:border-[#EE571F] focus:ring-1 focus:ring-[#EE571F] transition-all placeholder:text-neutral-300"

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className={labelClass}>
        {label}
      </label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={inputClass}
      />
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}
