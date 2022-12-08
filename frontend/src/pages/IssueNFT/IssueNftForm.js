import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import bg from "../../../assets/img/globe2.png";
import { useNavigate } from "react-router-dom";
import { useWallet } from "../../hooks/useWallet";
import useIpfsFactory from "../../hooks/useIpfsFactory";

function IssueNftForm() {
  const navigate = useNavigate();
  const { ipfs } = useIpfsFactory()
  const { accountId, callMethod, getTransactionResult } = useWallet()

  const [log, setLog] = useState();
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [artwork, setArtwork] = useState();
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [ipfsLink, setIpfsLink] = useState();

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
      return;
    }
    if (logs.txh == null) {
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

  const onFileChange = (e) => {
    setArtwork(e.target.files[0])
  }

  const ToNFTLink = () => {
    navigate('/nftlink')
  }

  //Mint nft
  const handleSubmit = async (e) => {
    ToNFTLink();
    e.preventDefault();
    try{
      if(!name || !startDate || !endDate) {
        console.log('Somethings missing');
        return ;
      }
      if(artwork) {
        const cid = await ipfs.add(artwork)
        if(cid && cid.length>0){
          setIpfsLink(`ipfs://${cid[0]?.hash}`);    
          const res =  await callMethod({
            contractId: process.env.GLORY_BADGE_CONTRACT, 
            method: 'nft_mint', 
            args: { 
              metadata: {
                title: name,
                description: description,
                media: `ipfs://${cid[0]?.hash}`,
                issued_at: new Date().toISOString(),
                starts_at: startDate,
                expires_at: endDate,
                extra: "Created", //This is supposed to reference who's minting (1 for owner, 2 for claimers  or something)
              }, 
              receiver_id: accountId 
            }
          });
          console.log(res)
        }    
      }
    }catch(error){
      console.log(error)
    }
  }

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
          <div className="bg-[#DAFF3E] rounded-[10px] font-robotoMono p-[2rem] px-[6rem]">
            <p className="text-[4vh] font-bold text-center text-black font-robotoMono mb-[2rem]">
              Issue a New Glory Badge
            </p>
            <div className="text-sm">
              <form>
                <div className="mb-3 text-left">
                  <label
                    htmlFor="endorsing"
                    className="block text-sm font-bold text-[#000000]"
                  >
                    Name of the Badge
                  </label>
                  <input
                    type=""
                    onChange={(e) => setName(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="my-2 text-left">
                  <label
                    htmlFor="endorsing"
                    className="block text-sm font-bold text-[#000000]"
                  >
                    Description (What’s so special about this Badge?)
                  </label>
                  <input
                    type=""
                    onChange={(e) => setDescription(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div className="mb-2 text-left">
                  <label
                    htmlFor="endorsing"
                    className="block text-sm font-semibold text-black"
                  >
                    Artwork
                  </label>
                  <input
                    type="file"
                    onChange={onFileChange}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  <div className="text-sm">
                    Mandatory: PNG or GIF format <br />
                    Recommended: size less than 200KB (Max. 4MB)
                  </div>
                </div>
                <div className="mt-[2rem] text-left flex flex-row justify-between">
                  <div className="flex flex-col">
                    <label
                      htmlFor="endorsing"
                      className="block text-sm font-semibold text-black"
                    >
                      Start Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setStartDate(e.target.value)}
                      className=" block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="endorsing"
                      className="block text-sm font-semibold text-black"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="date"
                      onChange={(e) => setEndDate(e.target.value)}
                      className=" block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </div>
                <div className="mt-8">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-white px-4 py-1 rounded-full font-bold  text-gray-700 border  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-60"
                  >
                    SUBMIT
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

export default IssueNftForm;
