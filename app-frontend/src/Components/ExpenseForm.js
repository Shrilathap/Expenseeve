import React, { useState } from 'react';
import {
  DatePicker,
  Form,
  Input,
  InputNumber,
  Select,
  Button
} from 'antd';
import { useSelector } from 'react-redux';
const { TextArea } = Input;

    const ExpenseForm = (props) => {
      const {selectedExpense,formSubmission}=props
      const categories=useSelector((state)=>{
        return state.category
      })
        const [name,setName]=useState(selectedExpense?selectedExpense.name:'')
        const [categoryId,setCategoryId]=useState(selectedExpense?selectedExpense.categoryId:'')
        const [expenseDate,setExpenseDate]=useState(selectedExpense?selectedExpense.expenseDate:null)
        const [amount,setAmount]=useState(selectedExpense?selectedExpense.amount:'')
        const [description,setDescription]=useState(selectedExpense?selectedExpense.description:'')

        const onFinish=(values)=>{
            const formData={
                name:name,
                categoryId:categoryId,
                expenseDate:expenseDate,
                amount:amount,
                description:description
            }
            formSubmission(formData)
            setName('')
            setCategoryId('')
            setDescription('')
            setAmount('')
            setExpenseDate(null)
        }

        const handleName=(e)=>{
          const name=e.target.value
          setName(name)
        }
        const handleDateChange = (date,dateString) => {
          setExpenseDate(dateString)
        };

        const handleSelectChange = (value) => {
          setCategoryId(value)
        };

        const handleAmount=(Amount)=>{
          setAmount(Amount)
        }

        const handleDescription=(e)=>{
          const text=e.target.value
          setDescription(text)
        }
        
      return (
        <>
          <Form
          initialValues={selectedExpense?selectedExpense:''}
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
            <Form.Item name="categoryId" label="Category" rules={[{required: true,message: 'Category is required!'}]}>
              <Select  onChange={handleSelectChange}  dropdownStyle={{zIndex:9999}}>
                {
                  categories.map((ele=>{
                    return(<Select.Option key={ele._id} value={ele._id}>{ele.name}</Select.Option>)
                  }))
                }
              </Select>
            </Form.Item>
            <Form.Item label="ExpenseDate">
              <DatePicker format="YYYY/MM/DD" 
                 onChange={handleDateChange} popupStyle={{ zIndex: 9999 }} />
            </Form.Item>
            <Form.Item name="amount" label="Amount" rules={[{required: true,message: 'Amount is rquired!'}]}>
              <InputNumber value={amount} onChange={handleAmount}/>
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{required: true,message: 'Description is needed!'}]}>
              <TextArea rows={4} value={description} onChange={handleDescription} />
            </Form.Item>
            <Button type='primary' htmlType="submit">Submit</Button>
          </Form>
        </>
      );
    };
    export default ExpenseForm