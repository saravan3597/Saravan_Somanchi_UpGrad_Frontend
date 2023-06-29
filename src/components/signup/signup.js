import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Button } from '@mui/material';
import '../signup/signup.css'

export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            password: ''
        };
    }
    render() {
        return (
            <>
                <div className="form">
                    <Typography variant="h6" component="h6" align='center'>
                        <div className="icon-container">
                            <LockOutlinedIcon />
                        </div>
                        <div>Sign up</div>
                    </Typography>
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
                                label="First Name"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Email Address"
                            />
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Password"
                                type="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                required
                                id="outlined-password-input"
                                label="Confirm Passowrd"
                                type="password"
                                autoComplete="current-password"
                            />
                            <TextField
                                required
                                id="outlined-number-input"
                                label="Contact Number"
                                type="number"
                            />
                        </div>
                        <Button fullWidth variant="contained" sx={{ backgroundColor: '#3f51b5' }}>Sign up</Button>
                        <div className="no-account-text">
                            <a>Already have an account ? Sign in</a>
                        </div>
                        <div className="copyright-text">Copyright <CopyrightIcon /> upGrad 2023</div>
                    </Box>
                </div>
            </>
        );
    }
}