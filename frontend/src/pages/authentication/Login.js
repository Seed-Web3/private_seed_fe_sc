import React, {useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import near from "../../../assets/img/near.png";
import bg from "../../../assets/img/globe.png";
import email from "../../../assets/img/email.png";
import google from "../../../assets/img/google.png";
import { useWallet } from "../../hooks/useWallet";

function Login() {
  const { accountId, signIn } = useWallet();
  const navigate = useNavigate();


    if (accountId) {
      navigate("profile/preview/:account");
    }
  const onHandleNearButton = () => {
    // navigate("profile/preview/:account")
    signIn("seed.bonebon.testnet");
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div
        className="w-full h-full fixed mt-[15em]"
        style={{
          background: `url(${bg}) no-repeat bottom`,
          backgroundSize: "cover",
          backgroundOrigin: "content-box",
        }}
      >
        <div className="flex flex-col justify-center items-center-center text-[#DAFF3E] font-robotoMono -mt-[10%]">
          <p className="text-[5vh] font-bold">WELCOME TO SEED</p>

          <div className="w-[15%] pt-[rem] m-auto">
            <div className="flex flex-col justify-center items-center mt-10 mx-[6rem]">
              <div>
                <Link to="/emailogin">
                  <button
                    type="button"
                    className="bg-[#DAFF3E] px-6 py-3 w-[230px] mb-4 rounded-2xl"
                  >
                    <div className="flex justify-between">
                      <div className="uppercase font-bold text-[3vh] text-black">
                        <p>email</p>
                      </div>
                      <div>
                        <img
                          src={email}
                          alt=""
                          className="w-[28px] h-[28px] mt-1"
                        />
                      </div>
                    </div>
                  </button>
                </Link>
                {/*<Link to="/profileForm">*/}
                {/*  <button*/}
                {/*    type="button"*/}
                {/*    className="bg-[#DAFF3E]  px-6 py-3 w-[230px] mb-4 rounded-2xl"*/}
                {/*  >*/}
                {/*    <div className="flex justify-between">*/}
                {/*      <div className="uppercase font-bold text-[3vh] text-black">*/}
                {/*        <p>google</p>*/}
                {/*      </div>*/}
                {/*      <div>*/}
                {/*        <img*/}
                {/*          src={google}*/}
                {/*          alt=""*/}
                {/*          className="w-[28px] h-[28px] mt-1"*/}
                {/*        />*/}
                {/*      </div>*/}
                {/*    </div>*/}
                {/*  </button>*/}
                {/*</Link>*/}
                <button
                  type="button"
                  className="bg-[#DAFF3E]  px-6 py-3 w-[230px] mb-4 rounded-2xl"
                  onClick={onHandleNearButton}
                >
                  <div className="flex justify-between">
                    <div className="uppercase font-bold text-[3vh] text-black">
                      <p>near</p>
                    </div>
                    <div>
                      <img
                        src={near}
                        alt=""
                        className="w-[28px] h-[28px] mt-1"
                      />
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="text-[#DAFF3E] text-xs mt-5 w-full">
            By signing in, you are agree to our terms of services
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
