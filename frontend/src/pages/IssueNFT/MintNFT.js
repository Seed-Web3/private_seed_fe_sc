import bg from "../../../assets/img/globe2.png";
import ntf from "../../../assets/img/placeholder.png"
import React, { useEffect, useState } from "react";
import { useWallet } from "../../hooks/useWallet";
import { useSearchParams } from "react-router-dom";

const style1 = {
    position:"absolute",
    height:"9vw",
    width:"9vw",
    left:"30%",
    top:"-3.5vw"
}
const style2 = {
    position:"absolute",
    height:"12vw",
    width:"12vw",
    left:"23%",
    top:"4vw"
}

function MintNFT() {
    let [a,seta] = useState(true)
    const { accountId, signIn } = useWallet();
    const [searchParams, setSearchParams] = useSearchParams();
    const [txh, setTxh] = useState(() => {
       // getting stored value
        const saved = localStorage.getItem("txh");
        const initialValue = JSON.parse(saved);
        return initialValue || "";
    });
    const [token, setToken] = useState(() => {
        // getting stored value
         const saved = localStorage.getItem("token");
         return saved || "";
     });

    //If not logged in: Log in + claim
    //If logged in: claim 
    const onHandleNearButton = () => {
        if(!accountId){
            signIn(process.env.GLORY_BADGE);
        }
        if(a && txh){
            SendTxh(`https://shark-app-46uev.ondigitalocean.app/event/claim`, {eventTxHash: txh})
            .then((data) => {
                console.log(data); // JSON data parsed by `data.json()` call
            });
            seta(a = false)
            localStorage.removeItem("txh");
        }
        
    };

    //Send txh to BE
    async function SendTxh(url = '', data = {}) {
        const response = await fetch(url, {
            method: 'POST', 
            headers: {
            'Content-Type': 'application/json',
            'Authorization':`Bearer ${token}`,
            },
            body: JSON.stringify(data) 
        });
        return response.json(); 
    }

    //Send txh to localStorage
    useEffect(()=> {
        if(accountId){
            if(searchParams.get("transactionHashes")){
                let txh = searchParams.get("transactionHashes");
                localStorage.setItem("txh", JSON.stringify(txh));
                setTxh(txh);
            }
        }
    },[accountId])

    return(
        <div className="relative min-h-screen overflow-hidden bg-black">
            <div className="w-full h-full fixed"
                 style={{
                     background: `url(${bg}) no-repeat bottom`,
                     backgroundSize: "cover",
                     backgroundOrigin: "content-box",
                 }}>
                <div className="text-3xl pt-[7vw]" style={{color:"#DAFF3E"}}>METABUILD III 2022</div>

                <div style={{
                    backgroundColor:"#DAFF3E",
                    margin:"5vw auto 0",
                    height:"28vw",
                    width:"22vw",
                    borderRadius:"20px",
                    position:"relative",
                    paddingTop:"12vw"
                }}>
                    <img style={a===true?style1:style2} src={ntf} alt=""/>
                    <div className="text-2xl font-bold"> {a===true?"Connect to Claim":""}</div>
                    <div  className="mt-[4vw] font-bold" style={{textAlign:"center"}}>
                        <button onClick={onHandleNearButton} style={{backgroundColor:"white",width:"7vw",height:"2.5vw"}}>{a===true?"Near wallet":"Request sent"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MintNFT
