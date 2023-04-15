import React from "react";
import { useSelector } from "react-redux";
import ProfileEdit from "./ProfileEdit";
import ImageAdd from "./ImageAdd";


const ProfileDetails=(props)=>{
    const [user,profile]=useSelector((state)=>{
        return [state.user,state.profile]
    })
    
   
    const serverUrl='http://localhost:3065/'
    const imageUrl=serverUrl+user.profileUrl
    return(
        <div>
            {user.profileUrl&&<img src={imageUrl} className='round-image'  alt="Profile"/>}
            <h6>UserName:{user.username}</h6>
            <h3>Name:{profile.name}</h3>
            <h3>Bio:{profile.bio}</h3>
            <h3>Age:{profile.age}</h3>
            <ProfileEdit/>
            <ImageAdd/>
        </div>
    )
}
export default ProfileDetails