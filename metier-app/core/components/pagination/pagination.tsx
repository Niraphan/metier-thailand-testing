"use client"

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import { useRouter } from "next/navigation"

export const Pagination = ({
  totalPages,
  currentPage,
}: {
  totalPages: number
  currentPage: number
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const router = useRouter()
  const params = new URLSearchParams()

  console.log("totalPages", totalPages)

  const handlePageChange = (page: number) => {
    params.set("page", page.toString())
    router.push(`/?${params.toString()}`)
  }

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePageChange(currentPage + 1)
    }
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1)
    }
  }

  return (
    <div className=" flex flex-row gap-2 justify-center items-center">
      <button
        className={`h-8 w-8 flex rounded-full justify-center items-center cursor-pointer group  ${currentPage === 1 ? "bg-slate-200 " : "bg-white hover:bg-primary/30"}`}
        onClick={handlePreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon
          fontSize="large"
          className="cursor-pointer  text-black"
        />
      </button>
      <div className="flex flex-row gap-4 items-center justify-center">
        {pages.length > 3
          ? pages.filter((page) => page >= currentPage - 1 && page <= currentPage + 1).map((page) => (
              <div key={page} className="flex flex-row gap-2">
                {page !== 1 && page !== totalPages && <p>...</p>}
              <button
                className={`rounded-full h-8 w-8 flex justify-center items-center cursor-pointer group  ${currentPage === page ? "bg-primary text-white" : "bg-white text-black"} hover:bg-primary-50`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
              {page !== totalPages && <p>...</p>}
              </div>
            ))
          : pages.map((page) => (
              <button
                className={`rounded-full h-8 w-8 flex justify-center items-center cursor-pointer group  ${currentPage === page ? "bg-primary text-white" : "bg-white text-black"} hover:bg-primary-50`}
                key={page}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            ))}
      </div>
      <button
        className={`rounded-full h-8 w-8 flex justify-center items-center cursor-pointer group hover:bg-primary-50 ${currentPage === totalPages ? "bg-slate-200 " : "bg-white hover:bg-primary/30"}`}
        onClick={handleNextPage}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon
          fontSize="large"
          className="cursor-pointer text-black"
        />
      </button>
    </div>
  )
}
