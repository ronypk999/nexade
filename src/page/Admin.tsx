import axios from "axios";
import React, { useEffect, useRef, useState } from "react"
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
interface data{
  address:string,
  privateCoinPrice:string,
  presaleEndTime:string,
  dxe:string,
  min:Record<string, string>
}

// interface min{
//   bnb:string,
//   eth:string,
//   base:string,
//   matic:string,
//   arb:string,
// }
export const Admin:React.FC = () => {
  const getCookie = (name:string) => {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
  
    return null; // Return null if cookie is not found
  };

  const [data,setData]  = useState<data | null>(null);
  const [access,setAccess]  = useState(getCookie("access") || false);

    const accessKey = useRef<HTMLInputElement | null>(null);
    const address = useRef<HTMLInputElement | null>(null);
    const bnb = useRef<HTMLInputElement | null>(null);
    const eth = useRef<HTMLInputElement | null>(null);
    const base = useRef<HTMLInputElement | null>(null);
    const matic = useRef<HTMLInputElement | null>(null);
    const arb = useRef<HTMLInputElement | null>(null);
    const privatePrice = useRef<HTMLInputElement | null>(null);
    const privateCoinPrice = useRef<HTMLInputElement | null>(null);
    const presaleEndTime = useRef<HTMLInputElement | null>(null);
   
    const setCookie = (name: string, value: string, days: number): void => {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));  // Set expiration date
      const expires = "expires=" + date.toUTCString();  // Convert date to UTC string
      
      // Set the cookie with the specified name, value, expiration date, and path
      document.cookie = `${name}=${value};${expires};path=/`;
    };
    const generateRandomString = (length:number) => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      const charactersLength = characters.length;
      
      for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
    
      return result;
    };

    const update = async()=>{
      if(getCookie("access") && data === null){
        try {
      
          const data = await axios.post(
              `${import.meta.env.VITE_API_URL}/api.php`,
              JSON.stringify({
                access: getCookie("access"),
                adminInfo:1
              })
            );
            
            setData(data.data);
          } catch (error) {
            handleLogout();
            toast.error("Failed to load data", {
                theme: "dark",
              });
          }
      }
   
    }
    

    const handleSubmit = async()=>{

        if(privatePrice?.current?.value || address?.current?.value || bnb?.current?.value || base?.current?.value || arb?.current?.value || eth?.current?.value || matic?.current?.value || presaleEndTime?.current?.value || privateCoinPrice?.current?.value){
     
            try {
              const data = await axios.post(
                  `${import.meta.env.VITE_API_URL}/api.php`,
                  JSON.stringify({
                    setSettings: 1,
                    address: address?.current?.value,
                    bnb: bnb?.current?.value,
                    eth: eth?.current?.value,
                    matic: matic?.current?.value,
                    arb: arb?.current?.value,
                    base: base?.current?.value,
                    privatePrice:privatePrice?.current?.value,
                    privateCoinPrice:privateCoinPrice?.current?.value,
                    presaleEndTime:presaleEndTime?.current?.value,
                    key: getCookie("access"),
                  })
                );
               setData(data.data);

                if(address?.current?.value){
                  address.current.value = "";
                }
                if(bnb?.current?.value){
                  bnb.current.value = "";
                }
                if(eth?.current?.value){
                  eth.current.value = "";
                }
                if(matic?.current?.value){
                  matic.current.value = "";
                }
                if(arb?.current?.value){
                  arb.current.value = "";
                }
                if(base?.current?.value){
                  base.current.value = "";
                }
                if(privatePrice?.current?.value){
                  privatePrice.current.value = "";
                }
                if(presaleEndTime?.current?.value){
                  presaleEndTime.current.value = "";
                }
                if(privateCoinPrice?.current?.value){
                  privateCoinPrice.current.value = "";
                }

                
                toast.success("Updated data", {
                    theme: "dark",
                  });
              } catch (error) {
                console.log(error)
                toast.error("Invalid session", {
                    theme: "dark",
                  });
              }
        }else{
            toast.error("All fields empty", {
                theme: "dark",
              });
        }

      
    }

    const handleAccess = async()=>{

      if(accessKey?.current?.value){
          try {
            const rand = generateRandomString(20);;
            const data = await axios.post(
                `${import.meta.env.VITE_API_URL}/api.php`,
                JSON.stringify({
                  access: accessKey?.current?.value,
                  key:rand
                })
              );

              accessKey.current.value = "";
              toast.success("Access Granted", {
                theme: "dark",
              });
              setCookie("access", rand, 30);
              setData(data.data);
              setAccess(true);
            } catch (error) {
              console.log(error);
              toast.error("Wrong key", {
                  theme: "dark",
                });
            }
      }else{
          toast.error("Enter access key", {
              theme: "dark",
            });
      }

    
  }

  const handleLogout = ()=>{
    document.cookie = `access=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    setAccess(false);
  }

  useEffect(()=>{
update();
  },[])
  return (
    <div>
        <ToastContainer></ToastContainer>
        {!access && <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f7fc',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
       
        <input
          ref={accessKey}
          type="text"
          placeholder="Enter access key"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <button
          onClick={handleAccess}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '4px',
            width: '100%',
            marginTop: '10px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => (e.target as any).style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => (e.target as any).style.backgroundColor = '#007bff'}
        >
          Verify
        </button>
      </div>
    </div>}
    {access && <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f4f7fc',
      display: 'flex',
      flexDirection:"column",
      gap:"20px",
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      margin: 0
    }}>

<div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center'
      }}>
        <div style={{fontSize:"18px",fontWeight:"bold"}}>Stats</div>
        <br/>
        {data ? <>
        
       <div style={{display:"flex",justifyContent:"space-around",paddingBottom:"5px"}}>
       <span>Address: </span>
       <span>{data?.address}</span>
       </div>

       <div style={{display:"flex",justifyContent:"space-around",paddingBottom:"5px"}}>
       <span>Presale End Time: </span>
       <span>{data?.presaleEndTime}</span>
       </div>
       
       <div style={{display:"flex",justifyContent:"space-around",paddingBottom:"5px"}}>
       <span>Private Coin Price:</span>
       <span>{data?.privateCoinPrice} USD</span>
       </div>
       <div style={{display:"flex",justifyContent:"space-around",paddingBottom:"5px"}}>
       <span>1 USD equal to:</span>
       <span>{data?.dxe} COIN</span>
       </div>
       
       {data?.min && Object.entries(data.min).map(([key, value], index) => {
        return (
          <div key={index} style={{ display: "flex", justifyContent: "space-around",paddingBottom:"5px" }}>
            <span>Minimum {key}: </span>  {/* Key (e.g., "ETH", "BNB") */}
            <span>{value}{" "}{key}</span>  {/* Value (e.g., "0.1", "0.00001") */}
          </div>
        );
      })}</>:<>Loading data</>}
      <button
          onClick={handleLogout}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '6px 10px',
            fontSize: '16px',
            cursor: 'pointer',
            float:"right",
            borderRadius: '4px',
            marginTop: '10px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => (e.target as any).style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => (e.target as any).style.backgroundColor = '#007bff'}
        >
          Logout
        </button>
        </div>
      
      <div style={{
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        width: '100%',
        maxWidth: '400px',
        textAlign: 'center'
      }}>
        <span style={{color:"red"}}>leave the field empty if don't want to update</span>
        <br/>
        <br/>
        <span style={{float:"left",fontSize:"18px"}}>Enter address</span>
        <input
          ref={address}
          type="text"
          placeholder="Enter ERC20 address"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
          <br/><br/>
        <span style={{float:"left",fontSize:"18px"}}>Enter minimum coin buy</span>
         <input
          ref={bnb}
          type="text"
          placeholder="BNB"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
         <input
          ref={eth}
          type="text"
          placeholder="ETH"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
          <input
          ref={matic}
          type="text"
          placeholder="MATIC"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
         <input
          ref={base}
          type="text"
          placeholder="BASE"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
         <input
          ref={arb}
          type="text"
          placeholder="ARBITRUM"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <br/><br/>
<span style={{float:"left",fontSize:"18px"}}>Enter private price</span>
<input
          ref={privatePrice}
          type="text"
          placeholder="Private price in USD"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <input
          ref={privateCoinPrice}
          type="text"
          placeholder="1 USD eqal coin"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
        <br/><br/>
<span style={{float:"left",fontSize:"18px"}}>Presale end time</span>
<input
          ref={presaleEndTime}
          type="datetime-local"
          placeholder="Private price"
          style={{
            width: '100%',
            padding: '12px',
            margin: '10px 0',
            border: '1px solid #ccc',
            borderRadius: '4px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />
       
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '12px 20px',
            fontSize: '16px',
            cursor: 'pointer',
            borderRadius: '4px',
            width: '100%',
            marginTop: '10px',
            transition: 'background-color 0.3s'
          }}
          onMouseEnter={(e) => (e.target as any).style.backgroundColor = '#0056b3'}
          onMouseLeave={(e) => (e.target as any).style.backgroundColor = '#007bff'}
        >
          Save
        </button>
      </div>
    </div>}
    </div>
   
  )
}