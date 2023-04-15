import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {startDeleteCategory } from "../Action/categoryAction";
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container'
import { Button } from 'antd';

const CategoryList=(props)=>{
    const categories=useSelector((state)=>{
        return state.category
    })
    const dispatch=useDispatch()

    const handleDelete=(id)=>{
        dispatch(startDeleteCategory(id))
    }

    return(
        <div>
            {categories.length > 0 &&
            <Container >
            <ListGroup >
                {
                    categories.map((ele) => {
                        return (<ListGroup.Item key={ele._id}><li className="list-group-item d-flex justify-content-between align-center">{ele.name}<Button className="badge bagde-primary badge-pill mr-3" type="primary" onClick={()=>{handleDelete(ele._id)}} >X</Button></li></ListGroup.Item>)
                    })
                }
            </ListGroup>
            </Container>
            }
        </div>
    )
}
export default CategoryList