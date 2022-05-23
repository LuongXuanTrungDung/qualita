import works from '@public/works/works.json';
import React, { useState } from 'react';

export default function Carousel({ className }: { className: string }) {
    const [currentSlide, setCurrentSlide] = useState(0);

    function changeSlide(slide: number) {
        if (slide < 0) setCurrentSlide(works.length - 1);
        else {
            if (slide > works.length - 1) setCurrentSlide(0);
            else setCurrentSlide(slide)
        }
    }

    return (
        <div className={"relative " + className}>
            <div className="overflow-hidden relative h-56 rounded-lg sm:h-64 xl:h-80 2xl:h-96">
                {works.map((work, index) => (
                    <div className={"duration-700 ease-in-out " + (currentSlide !== index ? "hidden" : "block")} key={index}>
                        <img src={"works/" + work.image} className="block absolute top-1/2 left-1/2 w-full -translate-x-1/2 -translate-y-1/2" alt={work.title} />
                    </div>
                ))}
            </div>

            {works.map((work, index) => (
                <div key={index} className={"my-4 "+(currentSlide !== index ? "hidden" : "block")}>
                    <h1 className="mx-4">{work.title}</h1>
                    <p className="mx-4 mt-1 mb-6">{work.desc}</p>
                </div>
            ))}

            <div className="flex absolute bottom-0 left-1/2 z-10 space-x-3 -translate-x-1/2">
                {works.map((work, index) => (
                    <React.Fragment>
                        <button
                            key={index}
                            onClick={changeSlide.bind(null, index)}
                            className={"w-6 h-2 rounded-full " + (currentSlide === index ? "bg-shade" : "bg-gray-800")}
                            aria-current={currentSlide === index ? "true" : "false"}
                            aria-label={work.title}
                        ></button>
                    </React.Fragment>
                ))}
            </div>

            <button className="flex absolute top-0 left-0 z-10 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" onClick={changeSlide.bind(null, currentSlide - 1)}>
                <span className="inline-flex justify-center items-center w-8 h-16 rounded-md sm:w-10 sm:h-20 group-hover:bg-fade dark:group-hover:bg-fade group-focus:outline-none">
                    <i className="w-5 h-5 text-fade group-hover:text-gray-800 sm:w-6 sm:h-6 fas fa-chevron-left leading-6"></i>
                    <span className="hidden">Previous</span>
                </span>
            </button>
            <button className="flex absolute top-0 right-0 z-10 justify-center items-center px-4 h-full cursor-pointer group focus:outline-none" onClick={changeSlide.bind(null, currentSlide + 1)}>
                <span className="inline-flex justify-center items-center w-8 h-16 rounded-md sm:w-10 sm:h-20 group-hover:bg-fade dark:group-hover:bg-fade group-focus:outline-none">
                    <i className="w-5 h-5 text-fade group-hover:text-gray-800 sm:w-6 sm:h-6 fas fa-chevron-right leading-6"></i>
                    <span className="hidden">Next</span>
                </span>
            </button>
        </div>
    )
}