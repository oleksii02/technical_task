import React, {useEffect, useState} from 'react';
import {
    Box,
    Button, CircularProgress,
    FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
} from "@mui/material";
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Visibility from '@mui/icons-material/Visibility';
import './login.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import axios from "axios";
import {useHistory} from "react-router-dom";
const url_login = 'https://technical-task-api.icapgroupgmbh.com/api/login/'



function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [usernameError, setUsernameError] = useState('Username cannot be empty')
    const [passwordError, setPasswordError] = useState('Password cannot be empty')
    const [usernameDirty, setUsernameDirty] = useState(false)
    const [passwordDirty, setPasswordDirty] = useState(false)
    const [formValid, setFormValid] = useState(true)
    const [circular, setCircular] = useState(false)


    useEffect(() => {
        if (usernameError || passwordError) {
            setFormValid(true)
        } else {
            setFormValid(false)
        }
    }, [usernameError, passwordError])


    const usernameHandler = (e) => {
        setUsername(e.target.value)
        if (!e.target.value) {
            setUsernameError('Username cannot be empty')
        } else {
            setUsernameError('')
        }

    }
    const passwordHandler = (e) => {
        setPassword(e.target.value)
        if (!e.target.value) {
            setPasswordError('Password cannot be empty')
        } else {
            setPasswordError('')
        }

    }
    const blurHandler = (e) => {
        switch (e.target.name) {
            case 'username':
                setUsernameDirty(true)
                break
            case 'password' :
                setPasswordDirty(true)
                break
            default:
            // do nothing
        }

    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    let history = useHistory();
        function handleClick() {
            history.push("/table");
        }

    const SingIn = () => {
        setCircular(true)
        axios.post(url_login, {
            "username": username,
            "password": password
        })
            .then(function (response) {
                console.log(response);
                setCircular(false)
                handleClick()
            })
            .catch(function (error) {
                console.log(error);
                setCircular(false)
                setUsername('')
                setPassword('')
                setUsernameError(error.message)
                setPasswordError(error.message)

            });

    }
    return (
        <Box className={'login__box'} sx={{
            '.MuiButtonBase-root:disabled': {
            cursor: 'not-allowed',
            pointerEvents: 'auto',
        }
        }}>
            <h1 color={'primary'}>Login</h1>
            <FormControl variant="outlined"
                         margin="normal">
                <InputLabel htmlFor="outlined-adornment-password"
                            error={usernameError && usernameDirty}>{(usernameError && usernameDirty) ? usernameError : 'UserName'}</InputLabel>

                <OutlinedInput
                    name={'username'}
                    value={username}
                    onChange={e => usernameHandler(e)}
                    onBlur={e => blurHandler(e)}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                edge="end"
                            >
                                <AccountCircleIcon/>
                            </IconButton>
                        </InputAdornment>
                    }
                    error={usernameError && usernameDirty}
                    label={(usernameError && usernameDirty) ? usernameError : 'UserName'}
                />
            </FormControl>

            <FormControl variant="outlined"
                         margin="normal">
                <InputLabel htmlFor="outlined-adornment-password"
                            error={passwordError && passwordDirty}>{(passwordError && passwordDirty) ? passwordError : 'Password'}</InputLabel>                <OutlinedInput
                    onChange={e => passwordHandler(e)}
                    onBlur={e => blurHandler(e)}
                    name={'password'}
                    value={password}

                    id="outlined-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    }
                    error={passwordError && passwordDirty}
                    label={(passwordError && passwordDirty) ? passwordError : 'Password'}
                />
            </FormControl>
            <FormControl variant="outlined"
                         margin="normal">
                <Button className={'login__button'}
                        variant="outlined"
                        onClick={SingIn}
                        disabled={formValid}
                >
                    {circular ? <CircularProgress size="2rem" /> : 'Sing in'}

                </Button>


            </FormControl>

        </Box>
    );
}

export default Login;
