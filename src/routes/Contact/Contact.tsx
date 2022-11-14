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

    const handleSubmit = async (event: React.FormEvent<EventTarget>) => {
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
                <div className="container border-1 p-10 mx-auto mt-5 mb-5 border-gray-200 border rounded shadow-lg w-6/12">
                    <div className="text-4xl text-center underline">Your message has been successfully sent!</div>
                    <div className="text-2xl text-center mt-5">I will be in touch with you shortly 🚀</div>
                    <div className="text-2xl text-center mt-5">In the mean time... why don't you checkout my <a href="/project" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">projects</a> or <a href="blog" className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600">blog</a> 👀</div>
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
            <div className="flex flex-col w-full items-center justify-center bg-[#ffe4c4]" style={{ backgroundImage: "url(/cake.png)" }}>
                <div className="bg-[#fffaf0] container border-1 p-10 mx-auto mt-5 mb-5 w-6/12 border-black border-solid border-2 shadow-custom drop-shadow-lg shadow-black z-10">
                    <div className="text-xl font-bold">Contact Me</div>
                    <div className="mt-1">Send me a message and I will be in touch promptly.</div>
                    <form
                        action={BACKEND_CONTACT_API_URL}
                        onSubmit={(event) => handleSubmit(event)}
                        method="POST"
                        target="_blank"
                        className="mt-5"
                    >
                        <div className="mt-5 mb-5 pt-0 font-bold">
                            <label className="inline-block mb-2">Name</label>
                            <input
                                type="text"
                                placeholder="Your full name..."
                                name="name"
                                minLength={1}
                                maxLength={30}
                                onChange={onChangeHandlerName}
                                value={name}
                                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="mb-5 pt-0 font-bold">
                            <label className="inline-block mb-2">Affiliation</label>
                            <input
                                type="text"
                                placeholder="Your affiliation..."
                                name="affiliation"
                                minLength={1}
                                maxLength={30}
                                onChange={onChangeHandlerAffiliation}
                                value={affiliation}
                                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="mb-5 pt-0 font-bold">
                            <label className="inline-block mb-2">Email</label>
                            <input
                                type="email"
                                placeholder="Your email..."
                                name="email"
                                minLength={1}
                                maxLength={30}
                                onChange={onChangeHandlerEmail}
                                value={email}
                                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="mb-5 pt-0 font-bold">
                            <label className="inline-block mb-2">Message</label>
                            <textarea
                                placeholder="Your message..."
                                name="message"
                                minLength={1}
                                maxLength={200}
                                onChange={onChangeHandlerMessage}
                                value={message}
                                className="px-3 py-3 placeholder-gray-400 text-gray-600 relative bg-white rounded text-sm border-0 shadow outline-non focus:outline-none focus:ring w-full"
                                required
                            />
                        </div>
                        <div className="flex justify-end">
                            <button className="border-8 animated-image bg-blue-600 text-white font-bold uppercase text-sm px-6 py-3 mr-1 mb-1"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
export default Contact;