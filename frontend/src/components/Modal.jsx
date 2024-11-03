import { useState } from "react"

export default function Modal(){
    const [params , setParams] = useState({ id: null , show : true});

    return(
        <div id="modal_wrapper" className={`absolute top-0 left-0 bottom-0 right-0 flex justify-center items-center opacity-80 z-10  bg-slate-500  ${params.show ? "block": "hidden"}`}>
            <div id="modal" className="flex flex-col w-96 h-96">
                <div id="header" className="flex-[1_1_0]">
                    Header
                </div>
                <div id="body" className="flex-[3_1_0]">
                    Body
                </div>
                <div id="footer" className="flex-[1_1_0]">
                    Footer
                </div>
            </div>
        </div>
    )
}