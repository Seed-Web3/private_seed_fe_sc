import bg from "../../../assets/img/globe2.png";
import ntf from "../../../assets/img/placeholder.png"
import {useState} from "react";

function MintNTF() {
    let [a,seta] = useState(true)
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
    function changeStyle() {
        seta(a = false)
        console.log(a)
    }
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
                    <div className="text-2xl font-bold"> Connect to Claim</div>
                    <div  className="mt-[4vw] font-bold" style={{textAlign:"center"}}>
                        <button onClick={changeStyle} style={{backgroundColor:"white",width:"7vw",height:"2.5vw"}}>Near Wallet</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default MintNTF
