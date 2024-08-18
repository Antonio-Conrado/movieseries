import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';

import configHeaders from "../config/configHeader";
import axiosClient from "../config/axiosClient";

const Casting = ({ urlAPI, title }) => {
    const [information, setInformation] = useState([]);
    const scrollRef = useRef(null);

    useEffect(() => {
        const getInformation = async () => {
            const { data } = await axiosClient(`${urlAPI}`, configHeaders);
            setInformation(data.cast.slice(0, 15));
        };
        getInformation();
    }, [urlAPI]);

    // Function to scroll images
    const ChangeImage = (direction) => {// direction = 'previous' or 'next'
        if (scrollRef.current) {
            // scrollLeft: the number of pixels that the content of the container is scrolled from the left
            // clientWidth: the visible width of the container
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === 'next' ? scrollLeft + clientWidth : scrollLeft - clientWidth;
            // Scroll the container to the new position with a smooth transition
            scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
        }
    };
    
    return (
        <>
            <h3 className="font-bold font-serif text-center text-cyan-500 my-6">{title}</h3>
            <div className="relative">
                <div className="overflow-scroll flex min-h-44 mx-10" ref={scrollRef}>
                    <div className="flex gap-3 items-center">
                        {information.map(info => (
                            <div key={info.id} className="flex-shrink-0 rounded-2xl">
                                <div className="w-40 h-fit relative">
                                    {info.profile_path ?
                                        <img 
                                            src={`https://image.tmdb.org/t/p/w185/${info.profile_path}`}
                                            className="w-40 h-fit object-center rounded-tl-2xl rounded-tr-2xl" 
                                            alt="image" />
                                        :
                                        <img src="/assets/img/header.avif" alt="image" className="h-fit"/>
                                    }
                                </div>
                                 {/* value */}
                                <div className="flex flex-col justify-center text-center w-40 h-20 text-gray-300 bg-slate-800 rounded-b-2xl">
                                    <Link
                                        to={`/perfil/${info.id}`}
                                        className="font-bold text-sm font-serif hover:cursor-pointer hover:text-gray-50"
                                    >
                                        {info.original_name}
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* previous - next */}
                <div className="absolute inset-y-0 left-4 flex items-center">
                    <img
                        src='/assets/icons/previous.png'
                        className="h-8 bg-gray-900 rounded-full p-2 opacity-70 hover:opacity-90 hover:cursor-pointer"
                        alt="previous"
                        onClick={() => ChangeImage('prev')}
                    />
                </div>
                <div className="absolute inset-y-0 right-4 flex items-center">
                    <img
                        src='/assets/icons/next.png'
                        className="h-8 bg-gray-900 rounded-full p-2 opacity-70 hover:opacity-90 hover:cursor-pointer"
                        alt="next"
                        onClick={() => ChangeImage('next')}
                    />
                </div>
            </div>
        </>
    );
};
Casting.propTypes = {
    urlAPI: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
}

export default Casting;
