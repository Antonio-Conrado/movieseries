import { useState, useEffect } from "react";


import configHeaders from "../config/configHeader";
import axiosClient from "../config/axiosClient";
import { data } from "autoprefixer";

const Player = ({ isOpen, onClose, children, id }) => {
    const [keyTrailer, setTrailer] = useState(undefined);


    useEffect(() => {
        const trailer = async () => {
            try {
                const url = `movie/${id}/videos?language=es-US`;
                const { data } = await axiosClient(url, configHeaders);
                // console.log(data.results);
                if (data.results.length >= 0) {
                    const urlEN = `movie/${id}/videos`;
                    const dataEN = await axiosClient(urlEN, configHeaders);
                    dataEN.data.results.map(info => {
                        if (info.type === "Trailer") {
                            setTrailer(info.key);
                        }
                    })
                } else {
                    data.results.map(info => {
                        if (info.type === 'Trailer') {
                            if (info.name.split(" ")[0].includes("Trailer") || info.name.split(" ")[0].includes("Tráiler")) {
                                setTrailer(info.key);
                            }
                        }
                    })
                }
            } catch (error) {
                console.log(error)
            }
        };
        trailer();
    }, [id, keyTrailer]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 ">
            <div className="bg-white h-fit w-fit  relative">
                <div className="player ">
                    <iframe
                        className="w-full h-full"
                        title="trailer"
                        src={`https://www.youtube.com/embed/${keyTrailer}`}
                        allowFullScreen
                        allow="autoplay"
                    ></iframe>
                </div>
                <button className="absolute top-1 right-1 text-red-500 text-2xl " onClick={onClose}>
                    <img src="/assets/icons/close.png" className="h-7 w-7"alt="" />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Player;
