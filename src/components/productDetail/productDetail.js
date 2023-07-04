import * as React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useNavigate } from "react-router-dom";
import '../productDetail/productDetail.css'

export default function ProductDetail(props) {
    const productDetail = JSON.parse(localStorage.getItem('upgrad_eshop_product'));
    const navigate = useNavigate();
    return (
        <>
            <div className='productDetailsContainer'>
                {!props.noImage ? <div className='leftContainer'>
                    <img src={productDetail.imageSrc} height={300} width={300} alt="product_image" />
                </div> : ''}
                <div className='rightContainer'>
                    <div className='content'>
                        <div className='title'>{productDetail.name}</div>
                        <div className='category'>
                            <span className='categoryHeader'>Category : </span>
                            <span className='categoryValue'>{productDetail.category.name}</span>
                        </div>
                        <div className='description'>
                            <i>{productDetail.description}</i>
                        </div>
                        <div className='price'>₹ {productDetail.price}</div>
                        {!props.isOrder ? <TextField
                            required
                            id="outlined-required"
                            label="Enter Quantity"
                        /> : ''}
                    </div>
                    {!props.isOrder ? <Button variant="contained" sx={{ backgroundColor: '#3f51b5', mt: 2 }} onClick={() => navigate('/order')}>PLACE ORDER</Button> : ''}
                </div>
            </div>
        </>
    );
}