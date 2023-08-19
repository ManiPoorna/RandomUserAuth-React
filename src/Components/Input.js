import React, { useState } from "react";

const Input = ()=>{


    let [name,setName] = useState("");
    let [password,setPassword] = useState("");
    let [logged,setLogged] = useState(false);
    let [userInfo,setUserInfo] = useState(null);
    let [token,setToken] = useState("");

    function details(){

        fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: name,
            password: password,
        })
        })
        .then((res) =>{
            return (res.json());
        }).then((data)=>{
            // console.log(data);
            localStorage.setItem("user",JSON.stringify(data));
            if(JSON.parse(localStorage.getItem('user').message === "Invalid credentials" )){
                alert(JSON.parse(localStorage.getItem('user').message))
                setLogged(false);
            }else{
                setLogged(true)
            }
            setToken(data.token)
            getUser();
        })
        .catch(error => console.error('Error:', error));



        function getUser(){
            let data = JSON.parse(localStorage.getItem('user'))
            if(data){
                fetch(`https://dummyjson.com/users/${data.id}`)
                .then((response)=>{
                    return response.json();
                })
                .then((data)=>{
                    console.log(data);
                    localStorage.setItem('userInfo',JSON.stringify(data));
                    const information = JSON.parse(localStorage.getItem('userInfo'));
                    if(information.message === "Invalid user id 'undefined'"){
                        setLogged(false);
                    }else{
                        setLogged(true)
                    }
                    console.log(information);
                    setUserInfo(information);
                }).catch((err)=>{
                    console.log(err);
                })
            }
        }

        
        
    }

    return(
        
        <div className="input">
            {
                !logged && 
                <div className="container">
                    <p>Welcome back..!</p>
                    <h2>Sign in to your Account</h2>
                    <div>
                        <p>Your Email : </p>
                        <input onChange={(e)=>setName(e.target.value)} id="mail" type="text"/>
                    </div>
                    <div>
                        <p>Your Password : </p>
                        <input onChange={(e)=>setPassword(e.target.value)} id="password" type="password"/>
                    </div>
                    <div>
                        <button onClick={details} id="submit">Submit</button>
                    </div>
                    <a href="#">Forgot your password? </a>
                </div>
            }

            {
                
                logged && userInfo!==null &&
                <div className="container1">
                    <div className="image">
                        <img src={userInfo.image}/>
                    </div>
                    <p>Username : {userInfo.username.toUpperCase()}</p>
                    <p>Fullname :{userInfo.maidenName.toUpperCase()} {userInfo.firstName.toUpperCase()} {userInfo.lastName.toUpperCase()}</p>
                    <p>Email : {userInfo.email}</p>
                    <p>DOB : {userInfo.birthDate}</p>
                    <p>Weight : {userInfo.weight}</p>
                    <p>Phone : {userInfo.phone}</p>
                    <p>Age : {userInfo.age}</p>
                    <p>Gender : {userInfo.gender.toUpperCase()}</p>
                    <p className="token">Token : {token}</p>
                        
                </div>
            }
        </div>
    )
}

export default Input;