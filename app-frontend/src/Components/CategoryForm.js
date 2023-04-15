import  React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { startAddCategory } from '../Action/categoryAction'

const CategoryForm=(props)=>{
    const[category,setCategory]=useState('')
    const dispatch=useDispatch()
    const handleChange=(e)=>{
        const category=e.target.value
        setCategory(category)
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        const formData={
            name:category
        }
        dispatch(startAddCategory(formData))
        setCategory('')
    }
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <input type='text' value={category} placeholder='Enter category name' onChange={handleChange}/>
            <button type='submit' >Add</button>
            </form>
        </div>
    )
}
export default CategoryForm