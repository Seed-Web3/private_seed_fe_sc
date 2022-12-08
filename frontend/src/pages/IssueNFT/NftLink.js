import React, { useEffect, useState } from "react";
import bg from "../../../assets/img/globe2.png";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";

function NftLink() {
  const navigate = useNavigate();
  const { accountId, getTransactionResult } = useWallet()
  const [log, setLog] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const urlParams = new URLSearchParams(window.location.search);
  const logs = {
    txh: urlParams.get("transactionHashes"),
    errorCode: urlParams.get("errorCode"),
    errorMessage: urlParams.get("errorMessage"),
  };

   /*
  * This method will check for params in the link that near-wallet-selector returns
  * If the transaction is successful (i.e the only param is transaction hash), then it'll push a post request to our BE
  */
   async function checkTxh() {
    if (logs.errorCode) {
      console.log(`Error: ${logs.errorCode}`);
      navigate('/');
      return;
    }
    if (logs.txh == null) {
      navigate('/');
      return;
    }
    try{
        // Get result from the transactions
        let result =await getTransactionResult(logs.txh);
        setLog(result)
    }
    catch(err){
      console.log(err)
    }
  }

  const [copyText, setCopyText] = useState("");
  const onCopy = () => {
    navigator.clipboard.writeText(copyText);
  };

  //copy to clipboard functionality
  useEffect(() => {
    let txh = searchParams.get("transactionHashes")
    setCopyText(`http://localhost:1234/MintNFT?transactionHashes=${txh}`)
  },[])

  useEffect(()=> {
    if(accountId){
      checkTxh();
    }
  },[accountId])

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="w-full h-full fixed"
        style={{
          background: `url(${bg}) no-repeat bottom`,
          backgroundSize: "cover",
          backgroundOrigin: "content-box",
        }}
      >
        <div className="mx-[20rem] p-[5rem]">
          <div className="bg-[#DAFF3E] rounded-[10px] font-robotoMono p-[3rem] px-[6rem]">
            <p className="text-[4vh] font-bold text-center text-black font-robotoMono ">
              Issue a New Glory Badge
            </p>
            <div>
              <form>
                <div className="my-[10rem]">
                  <label
                    htmlFor="endorsing"
                    className="block text-sm font-bold text-[#000000] mb-3"
                  >
                    Here’s your Glory Badge Link, share with your audience :D
                  </label>
                  <div>
                    <input
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-center text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                      value={copyText}
                      onChange={(e) => setCopyText(e.target.value)}
                    />
                  </div>
                  <button
                    type="button"
                    className="text-sm mt-3 js-copy-to-clip"
                    onClick={onCopy}
                  >
                    Click to Copy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NftLink;
