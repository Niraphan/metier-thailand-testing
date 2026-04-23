export const BlogBanner = ({
  thumbnail,
  title,
}: {
  thumbnail: string
  title: string
}) => {
  return (
    <div className="relative w-full h-[clamp(260px,45vw,520px)] overflow-hidden">
      <img
        src={thumbnail}
        alt={title}
        className="w-full h-full object-cover block"
      />
      <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-[rgba(21,21,21,0.78)]" />
      <div className="absolute bottom-0 left-0 right-0 px-6 sm:px-16 pb-10 pt-8">
        <h1 className=" text-[clamp(1.75rem,4vw,3rem)] font-bold text-white leading-tight max-w-3xl shadow-md">
          {title}
        </h1>
      </div>
    </div>
  )
}
