import React,{useState} from "react";
import {
    Form,
    Input,
    Button
  } from 'antd';

const ProfileForm=(props)=>{
    const {formSubmission,profile}=props
    const [name,setName]=useState(profile?profile.name:'')
    const [age,setAge]=useState(profile?profile.age:'')
    const [bio,setBio]=useState(profile?profile.bio:'')

    const onFinish=(values)=>{
        const formData={
            name:name,
            age:age,
            bio:bio,
        }
        formSubmission(formData)
        }

        const handleName=(e)=>{
            const name=e.target.value
            setName(name)
          }

          const handleAge=(e)=>{
            const age=e.target.value
            setAge(age)
          }
          const handleBio=(e)=>{
            const bio=e.target.value
            setBio(bio)
          }

        
    return(
        <>
        <Form
        initialValues={profile?profile:''}
          onFinish={onFinish}
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              maxWidth: 600,
            }}
          >
            <Form.Item  name="name" label="Name" rules={[{required: true,message: 'Name is required!'}]}>
              <Input value={name} onChange={handleName}/>
            </Form.Item>
            <Form.Item  name="age" label="Age" rules={[{required: true,message: 'Age is required!'}]}>
              <Input value={age} onChange={handleAge}/>
            </Form.Item>
            <Form.Item  name="bio" label="Bio" rules={[{required: true,message: 'Bio is required!'}]}>
              <Input value={bio} onChange={handleBio}/>
            </Form.Item>
            <Button type='primary' htmlType="submit">Submit</Button>
          </Form>
        </>

    )
}
export default ProfileForm