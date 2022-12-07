import { useCallback } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import React, { useState } from "react";
import axios from "axios";
import type { IOptions, RecursivePartial, Container, Engine } from "tsparticles-engine";

import ContactForm from "../../components/Contact/ContactForm";
import { BACKEND_CONTACT_API_URL } from "../../constants";

const TS_PARTICLES_OPTIONS: (RecursivePartial<IOptions> | undefined) = {
    "fullScreen": {
        "zIndex": 1
    },
    "particles": {
        "color": {
            "value": [
                "#1E00FF",
                "#FF0061",
                "#E1FF00",
                "#00FF9E"
            ]
        },
        "move": {
            "direction": "bottom",
            "enable": true,
            "outModes": {
                "default": "out"
            },
            "size": true,
            "speed": {
                "min": 1,
                "max": 3
            }
        },
        "number": {
            "value": 500,
            "density": {
                "enable": true,
                "area": 800
            }
        },
        "opacity": {
            "value": 1,
            "animation": {
                "enable": false,
                "startValue": "max",
                "destroy": "min",
                "speed": 0.3,
                "sync": true
            }
        },
        "rotate": {
            "value": {
                "min": 0,
                "max": 360
            },
            "direction": "random",
            "animation": {
                "enable": true,
                "speed": 60
            }
        },
        "tilt": {
            "direction": "random",
            "enable": true,
            "move": true,
            "value": {
                "min": 0,
                "max": 360
            },
            "animation": {
                "enable": true,
                "speed": 60
            }
        },
        "shape": {
            "type": [
                "circle",
                "square",
                "triangle",
                "polygon"
            ],
            "options": {
                "polygon": [
                    {
                        "sides": 5
                    },
                    {
                        "sides": 6
                    }
                ]
            }
        },
        "size": {
            "value": {
                "min": 2,
                "max": 4
            }
        },
        "roll": {
            "darken": {
                "enable": true,
                "value": 30
            },
            "enlighten": {
                "enable": true,
                "value": 30
            },
            "enable": true,
            "speed": {
                "min": 15,
                "max": 25
            }
        },
        "wobble": {
            "distance": 30,
            "enable": true,
            "move": true,
            "speed": {
                "min": -15,
                "max": 15
            }
        }
    }
}

const Contact = (): JSX.Element => {
    const [submitted, setSubmitted] = useState(false)
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [affiliation, setAffiliation] = useState("")
    const [message, setMessage] = useState("")

    const particlesInit = useCallback(async (engine: Engine) => {
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async (container: Container | undefined) => {
        await console.log(container)
    }, []);


    const onChangeHandlerName = (event: React.ChangeEvent<EventTarget>) => { const target = event.target as HTMLInputElement; setName(target.value) };
    const onChangeHandlerEmail = (event: React.ChangeEvent<EventTarget>) => { const target = event.target as HTMLInputElement; setEmail(target.value) };
    const onChangeHandlerAffiliation = (event: React.ChangeEvent<EventTarget>) => { const target = event.target as HTMLInputElement; setAffiliation(target.value) };
    const onChangeHandlerMessage = (event: React.ChangeEvent<EventTarget>) => { const target = event.target as HTMLTextAreaElement; setMessage(target.value) };

    const onSubmitHandlerContact = async (event: React.FormEvent<EventTarget>) => {
        event.preventDefault();

        try {
            const res = await axios.post(BACKEND_CONTACT_API_URL, {
                name: name,
                email: email,
                affiliation: affiliation,
                message: message
            })
            console.log(res.data)
            setSubmitted(true)
        } catch (error) {
            console.log("error contact form: ", error)
        }
    }

    if (submitted) {
        return (
            <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                className="tsparticle-overlay"
                options={TS_PARTICLES_OPTIONS}
            />
            <div className="flex w-full items-center justify-center bg-[#F8F8FF]" style={{ backgroundImage: "url(/cake.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
            <div className="bg-[#E4EAFF] border-1 p-4 md:p-12 lg:p-16 my-5 w-4/5 md:w-3/5 lg:w-2/5 border-black border-solid border-8 rounded-xl z-10">
                    <div className="text-4xl text-center underline">Your message has been successfully sent!</div>
                    <div className="text-2xl text-center mt-5">I will be in touch with you shortly 🚀</div>
                    <div className="text-2xl text-center mt-5">In the mean time... why don't you checkout my <a href="/project" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">projects</a> or <a href="blog" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">blog</a> 👀</div>
                </div>
            </div>
            </>
        )
    }
    // TODO: create form component
    return (
        <>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                className="tsparticle-overlay"
                options={TS_PARTICLES_OPTIONS}
            />
            <div className="flex w-full items-center justify-center bg-[#F8F8FF]" style={{ backgroundImage: "url(/cake.svg)", backgroundSize: "cover", backgroundRepeat: "no-repeat"}}>
                <div className="bg-[#E4EAFF] border-1 p-4 md:p-12 lg:p-16 my-5 w-4/5 md:w-3/5 lg:w-2/5 border-black border-solid border-8 rounded-xl z-10">
                    <div className="text-lg md:text-2xl lg:text-4xl font-bold">LET'S WORK TOGETHER.</div>
                    <form
                        action={BACKEND_CONTACT_API_URL}
                        onSubmit={(event) => onSubmitHandlerContact(event)}
                        method="POST"
                        target="_blank"
                        className="mt-5"
                    >
                        <div className="my-5 pt-0 font-bold">
                            <input
                                type="text"
                                placeholder="Name..."
                                name="name"
                                minLength={1}
                                maxLength={30}
                                onChange={onChangeHandlerName}
                                value={name}
                                className="border-2 border-black px-3 py-3 placeholder-grey-800 text-black text-md md:text-xl lg:text-xl relative bg-white rounded  shadow-2xl outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="mb-5 pt-0 font-bold">
                            <input
                                type="text"
                                placeholder="Affiliation..."
                                name="affiliation"
                                minLength={1}
                                maxLength={30}
                                onChange={onChangeHandlerAffiliation}
                                value={affiliation}
                                className="border-2 border-black px-3 py-3 placeholder-grey-800 text-black text-md md:text-xl lg:text-xl relative bg-white rounded  shadow-2xl outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="mb-5 pt-0 font-bold">
                            <input
                                type="email"
                                placeholder="Email..."
                                name="email"
                                minLength={1}
                                maxLength={30}
                                onChange={onChangeHandlerEmail}
                                value={email}
                                className="border-2 border-black px-3 py-3 placeholder-grey-800 text-black text-md md:text-xl lg:text-xl relative bg-white rounded  shadow-2xl outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="mb-5 pt-0 font-bold">
                            <textarea
                                placeholder="Message..."
                                name="message"
                                minLength={1}
                                maxLength={200}
                                onChange={onChangeHandlerMessage}
                                value={message}
                                className="border-2 border-black px-3 py-3 placeholder-grey-800 text-black text-md md:text-xl lg:text-xl relative bg-white rounded  shadow-2xl outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="flex justify-center ">
                            <button className="flex justify-center w-1/2 border-8 bg-[#95ADFF] text-white font-bold uppercase text-xl p-3 border-black"
                            >
                                <img src="/send-button.svg" alt="send-button"/>
                            </button>
                        </div>                        
                    </form>
                </div>
            </div>

        </>
    )
}
export default Contact;