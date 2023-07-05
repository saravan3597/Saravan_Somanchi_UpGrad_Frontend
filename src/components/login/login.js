import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { Button } from '@mui/material';
import '../login/login.css'
import { Link } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import store from '../../store/store';

export default function Login() {
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const loginFailed = () => {
        setShowFailureSnackbar(true);
        setEmailAddress('');
        setPassword('');
    }
    const navigate = useNavigate();
    const signIn = () => {
        let users = localStorage.getItem('upgrad_eshop_users');
        users = users ? JSON.parse(users) : [];
        const presentUser = users.find(user => user.emailAddress === emailAddress);
        if (presentUser) {
            if (password === presentUser.password) {
                setShowConfirmationSnackbar(true);
                localStorage.setItem('upgrad_eshop_user', JSON.stringify(presentUser));
                setTimeout(() => {
                    window.location.href = '/products';
                }, 1000);
            } else {
                loginFailed();
            }
        } else {
            loginFailed();
        }
    }

    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });

    const [showConfirmationSnackbar, setShowConfirmationSnackbar] = React.useState(false);
    const [showFailureSnackbar, setShowFailureSnackbar] = React.useState(false);
    return (
        <>
            <div className="form">
                <Typography variant="h6" component="h6" align='center'>
                    <div className="icon-container">
                        <LockOutlinedIcon />
                    </div>
                    <div>Sign in</div>
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
                            label="Email Address"
                            value={emailAddress}
                            onChange={(e) => setEmailAddress(e.target.value)}
                        />
                        <TextField
                            required
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button fullWidth variant="contained" sx={{ backgroundColor: '#3f51b5' }} onClick={() => signIn()}>Sign in</Button>
                    <div className="no-account-text">
                        <Link to="/signup">Don't have an account? Sign up </Link>
                    </div>
                    <div className="copyright-text">Copyright <CopyrightIcon /> upGrad 2023</div>
                    <Snackbar open={showConfirmationSnackbar} autoHideDuration={1000}>
                        <Alert severity="success" sx={{ width: '100%' }}>
                            User Logged in Successfully
                        </Alert>
                    </Snackbar>
                    <Snackbar open={showFailureSnackbar} autoHideDuration={1000}>
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Unsuccessful Login Attempt
                        </Alert>
                    </Snackbar>
                </Box>
            </div>
        </>
    );
}