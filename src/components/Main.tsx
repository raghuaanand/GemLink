import React, { useContext } from "react";
import { assets } from "../assets/assets.ts";
import { Context } from "../context/context";
import Cards from "./Cards.tsx";

const Main = () => {

    interface MyContextType {
        onSent: (prompt: any) => Promise<void>;
        recentPrompt: string;
        showResult: boolean;
        loading: boolean;
        resultData: string;
        setInput: React.Dispatch<React.SetStateAction<string>>;
        input: string;
    }
    
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
    } = useContext<MyContextType>(Context);
    return (
        <div className="flex-col bg-white pt-20 m-8 pl-48 rounded-2xl">

            <div className="rounded-full bg-sky-200 w-12 h-12 flex justify-center items-center">
                <img src={assets.gemLink_logo} alt="logo" className="w-8 h-8 opacity-70"/>
            </div>
            <div className="main-container">
                {!showResult ? (
                    <>
                        <div className="greet">
                            <p>
                                <span>I am GemLink, a chat assistant for your everyday queries.</span>
                            </p>
                            <p>Got a question? Simply type in the highlighted prompt box and tap on the ‘Arrow’ icon or tap on any of the suggestions given below.</p>
                        </div>
                        <div className="cards">
                            <Cards />
                        </div>
                    </>
                ) : (
                    <div className="result">
                        <div className="result-title">
                            <img src={assets.user_icon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="resultData">
                            <img src={assets.gemini_icon} alt="" />
                            {loading ? (
                                <div className="loader">
                                    <hr />
                                    <hr />
                                    <hr />
                                </div>
                            ) : (
                                <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            )}
                        </div>
                    </div>
                )}

                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter the prompt here..."
                        />
                        <div>
                            <img src={assets.gallery_icon} alt="" />
                            <img src={assets.mic_icon} alt="" />
                            {input ? (
                                <img onClick={() => onSent(prompt)} src={assets.send_icon} alt="" />
                            ) : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Altough a Gemini clone has been developed by Kshitij Still it may
                        display incorrect info.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;
