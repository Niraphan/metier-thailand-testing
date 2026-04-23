import { BlogPicture } from "@/data/domain/blog.domain"

export const BlogAlbum = ({ images }: { images: BlogPicture[] }) => {
  return (
    <div className=" w-full flex flex-col gap-4 py-8">
        <h1 className=" text-xl md:text-2xl pl-4 border-l-3 border-primary border-rounded font-bold">
            รูปภาพประกอบ
        </h1>
        <div className=" grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => (
                <div key={index} className=" w-full aspect-square bg-gray-200 overflow-hidden rounded-lg max-w-[250px] md:max-w-none hover:scale-105 transition-transform duration-300 cursor-pointer">
                    <img src={image.image_url} alt={`image-${index}`} className=" w-full h-full object-cover object-center" />
                </div>
            ))}
        </div>
    </div>
  )
}