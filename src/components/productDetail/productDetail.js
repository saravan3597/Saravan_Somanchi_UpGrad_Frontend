import * as React from 'react';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import '../productDetail/productDetail.css'

export default class ProductDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productDetail: JSON.parse(localStorage.getItem('upgrad_product'))
        }
    }
    render() {
        return (
            <>
                <div className='productDetailsContainer'>
                    {!this.props.noImage ? <div className='leftContainer'>
                        <img src={this.state.productDetail.imageSrc} height={300} width={300} />
                    </div> : ''}
                    <div className='rightContainer'>
                        <div className='content'>
                            <div className='title'>{this.state.productDetail.name}</div>
                            <div className='category'>
                                <span className='categoryHeader'>Category : </span>
                                <span className='categoryValue'>{this.state.productDetail.category.name}</span>
                            </div>
                            <div className='description'>
                                <i>{this.state.productDetail.description}</i>
                            </div>
                            <div className='price'>₹ {this.state.productDetail.price}</div>
                            {!this.props.isOrder ? <TextField
                                required
                                id="outlined-required"
                                label="Enter Quantity"
                            /> : ''}
                        </div>
                        {!this.props.isOrder ? <Button variant="contained" sx={{ backgroundColor: '#3f51b5', mt: 2 }}>PLACE ORDER</Button> : ''}
                    </div>
                </div>
            </>
        );
    }
}