import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import TextField from '@mui/material/TextField';
import ProductDetail from '../productDetail/productDetail';
import { Button, Typography } from '@mui/material';
import '../order/order.css';

const steps = ['Items', 'Select Address', 'Confirm Order'];

export default class Order extends React.Component {
  constructor() {
    super();
    this.state = {
      productDetail: JSON.parse(localStorage.getItem('upgrad_eshop_product')),
      activeStep: 2
    }
  }
  render() {
    const changeStep = (increment) => {
      if (increment) {
        this.setState({ activeStep: this.state.activeStep + 1 });
      } else {
        this.setState({ activeStep: this.state.activeStep - 1 });
      }
    }
    return (
      <>
        <div className='orderContainer'>
          <Box sx={{ width: '100%' }}>
            <Stepper activeStep={this.state.activeStep}>
              {steps.map((item) => {
                return (
                  <Step key={item}>
                    <StepLabel>{item}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            <div className='orderContent'>
              {this.state.activeStep === 0 ? <ProductDetail isOrder={true}></ProductDetail> : this.state.activeStep === 1 ? <div className='addressContainer'>
                <div className="form">
                  <Box
                    component="form"
                    sx={{
                      '& .MuiTextField-root': { mt: 1, mb: 1.5, width: '35ch', maxWidth: '100%' },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <TextField
                        required
                        id="outlined-required"
                        label="Name"
                      />
                      <TextField
                        required
                        id="outlined-number-input"
                        label="Contact Number"
                        type="number"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Street"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="City"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="State"
                      />
                      <TextField
                        required
                        id="outlined-required"
                        label="Landmark"
                      />
                      <TextField
                        required
                        id="outlined-number-input"
                        label="Zip Code"
                        type="number"
                      />
                    </div>
                  </Box>
                </div>
              </div> : <div className='orderConfirmation'>
                <div className='leftContainer'>
                  <ProductDetail isOrder={true} noImage={true}></ProductDetail>
                </div>
                <div className='rightContainer'>
                  <div className='address'>
                    <Typography variant="h3" component="h3" sx={{ fontWeight: 500 }}>Address</Typography>
                    <div className='addressContent'>
                      <div>Saravan Somanchi</div>
                      <div>Madhura Nagar</div>
                      <div>Kakinada</div>
                      <div>533004</div>
                      <div>Phone : 9963665586</div>
                    </div>
                  </div>
                </div>
              </div>
              }
              <div className='buttons'>
                {this.state.activeStep !== 0 ? <Button variant='text' sx={{ color: '#3f51b5', mr: 1 }} onClick={() => changeStep()}>Back</Button> : ''}
                {this.state.activeStep !== steps.length - 1 ? <Button variant='contained' sx={{ backgroundColor: '#3f51b5' }} onClick={() => changeStep(true)}>NEXT</Button> : ''}
              </div>
            </div>
          </Box>
        </div>
      </>
    );
  }
}