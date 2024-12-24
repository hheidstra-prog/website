import Image, { type ImageProps } from 'next/image'
import image1 from '@/images/photos/image-3.jpg'


export default function Banner() {


    return (
        <div className="relative mx-auto w-full max-w-7xl lg:px-8 mt-8">
            {/* Background Image */}
            <div className="relative w-full">
                <Image
                src={image1}
                alt="Banner background"
                layout="responsive"
                width={1920}
                height={700} /* Adjust aspect ratio as needed */
                objectFit="cover"
                className="w-auto"
                />
            </div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-gray-800/50 p-4 sm:p-6 md:p-8 rounded-md text-center max-w-[90%] md:max-w-[70%] lg:max-w-[50%]">
                <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                    Welkom bij Digitaalfabriek - <br />
                    <span className="text-lg sm:text-2xl md:text-3xl">
                    AI-oplossingen voor mkb-bedrijven
                    </span>
                </h1>
                </div>
            </div>    

        </div>
    




    )
}