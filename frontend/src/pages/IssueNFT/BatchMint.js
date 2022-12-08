import React ,{useEffect, useState} from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import bg from "../../../assets/img/globe2.png";
import { useWallet } from "../../hooks/useWallet";

/*TODO
* Fetch list of addresses from BE
* Fetch token information from txh/token_id
*/
function BatchMint() {
  const navigate = useNavigate();
  const { accountId, viewMethod,  callMethod, getTransactionResult } = useWallet();

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

  const [metadata, setMetadata] = useState();
  //States of the components
  const [list, setList] = useState([]);
  const [log, setLog] = useState();
  const [isClicked, setIsClicked] = useState();
  const [address, setAddress] = useState();
  const [data, setData] = useState([]);

  // Check if there is a transaction hash in the URL
  const logs = { txh : searchParams.get("transactionHashes"), errorCode: searchParams.get("errorCode"), errorMessage: searchParams.get("errorMessage")};
  
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
        let data = await getMetadata(result?.data[0].token_ids[0])
        setMetadata(data.metadata)
    }
    catch(err){
      console.log(err)
    }
  }

  //Get token metadata
  async function getMetadata(token_id) {
    const res = await viewMethod(
      process.env.GLORY_BADGE_CONTRACT, 
      'nft_token' , 
      { 
        token_id : token_id
      }
    );
    return res;
  }

  //Send txh to BE
  async function GetList(url = '') {
    try{
      // Default options are marked with *
      const response = await fetch(url, {
          method: 'GET', 
          headers: {
          'Content-Type': 'application/json',
          'Authorization':`Bearer ${token}`,
          },
      });
      return response.json(); // parses JSON response into native JavaScript objects
    }catch(err){
      console.log(err)
    }
  }

  //Mint function
  async function handleSubmit(){
    navigate('/mintSuccess'); 
    try{
      await callMethod({
        contractId: process.env.GLORY_BADGE_CONTRACT, 
        method: 'bulk_nft_mint', 
        args: { 
          metadata:  {
            title: metadata.title,
            description: metadata.description,
            media : metadata.media,
            issued_at : metadata.issued_at ,
            expires_at :metadata.expires_at ,
            starts_at : metadata.starts_at ,
            extra: "Claimed" //This is supposed to reference who's minting (1 for owner, 2 for claimers  or something)
          },  
          list: list 
        }
      });
    }catch(error){
      console.log(error)
    }
  }

  //Manually add a wallet
  const handleAddition = () => {
    setData(data => [...data, {nearAddress: address}]);
  }

  //checkbox handle
  const handleOnClick = index => {
    const newData = [...data];
    newData[index].isChecked = !newData[index].isChecked;
    setData(newData);
  };

  //Fetch data from API and store it in a `data` state
  useEffect(()=> {
    if(txh){
      GetList(`https://shark-app-46uev.ondigitalocean.app/event/${txh}/users`)
      .then((data) => {
        setData(data);
      });  
    }
  },[txh])

  //Get final list of selected users
  useEffect(()=> {
    let newList=[];
    data.forEach((val,key)=> {
      if(val?.isChecked){
        newList.push(val.nearAddress);
      }
    })
    setList(newList);
  },[data])

  //Store txh in localStorage
  useEffect(()=> {
    if(accountId){
      if(searchParams.get("transactionHashes")){
        let txh = searchParams.get("transactionHashes");
        localStorage.setItem("txh", JSON.stringify(txh));
        setTxh(txh);
      }
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
          <div className="bg-[#DAFF3E] rounded-[10px] p-[3rem] px-[4rem] font-robotoMono">
            <form>
              <div className="flex flex-row justify-between">
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="block w-full px-4 py-2 mt-2 text-center text-gray-700 bg-white border rounded-md"
                    onClick={() => setIsClicked(!isClicked)}
                  >
                    Upload Wallet Address
                  </button>
                </div>
                <div className="flex flex-col">
                  <button
                    type="button"
                    className="block w-full px-4 py-2 mt-2 text-center text-gray-700 bg-white border rounded-md"
                  >
                    <Link to="/indexissuenft">Create New Badges</Link>
                  </button>
                </div>
              </div>
              <div className="block w-full px-[3rem] py-2 mt-2 text-center text-gray-700 bg-white border rounded-md">
                <div className="flex flex-row text-2xl font-bold justify-center m-[1rem]">
                  Select and Mint in Batch
                </div>
                { isClicked ?
                <div className="flex flex-row my-[2rem]">
                  <input type="text" className="bg-white rounded-md border-2 text-xs p-1"  onChange={(e) => setAddress(e.target.value)}/>
                  <button
                    type="button"
                    className="bg-white rounded-md border-2 text-xs p-1"
                    onClick={handleAddition}
                  >
                    Add Address
                  </button>
                </div>
                :
                <div className="flex flex-row my-[2rem]">
                  <button
                    type="button"
                    className="bg-white rounded-md border-2 text-xs p-1"
                  >
                    Select All
                  </button>
                </div>
                }
                <div className="flex flex-col text-sm">
                  <div className="flex flex-row justify-between mb-4">
                    <div className="ml-[1rem]">Wallet Address</div>
                    <div className="mr-[5rem]">Request Time</div>
                  </div>
                  { data.map((val,key) => {
                      if(val.nearAddress){
                        return (
                          <div className="flex flex-row justify-between" key={key}>
                            <div>
                                <input 
                                  key={key}
                                  type="checkbox" 
                                  className="mr-2" 
                                  checked={val.isChecked}
                                  onClick={() => handleOnClick(key)}
                                />
                                {val.nearAddress}
                            </div>
                            <div>{val.date}</div>
                          </div>
                        );
                      }
                    })
                  }
                </div>

                <div className="flex flex-row my-[2rem]">
                  <button
                    type="button"
                    className="bg-black text-[#DAFF3E] rounded-full px-3 py-1 text-sm"
                    onClick={handleSubmit}
                  >
                    Mint and Distribute Badges
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BatchMint;
