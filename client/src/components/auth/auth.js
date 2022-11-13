import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core';
import LockOutlienedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import jwt_decoded from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from './input';
// import Icon from './icon';
import useStyles from './styles';
import { AUTH } from '../../constants/actionTypes';
// import { createOrGetUser } from '../../api';

const Auth = () => {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignUp] =  useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword );

  const handleSubmit = () => {
  
  }

  const handleChange = () => {

  }

  const switchMode = () => {
    setIsSignUp((prevIsSignup) => !prevIsSignup);
    handleShowPassword(false);
  }

  const googleSuccess = async(res) => {
    // const {sub, email, family_name, given_name, name,  imageUrl} = jwt_decoded(res.credential);

    // const result = {
    //   id: sub,
    //   email: email,
    //   familyName: family_name,
    //   givenName: given_name,
    //   name: name,
    //   picture: imageUrl
    // }

    const result = jwt_decoded(res.credential);

    const token = res.credential;
  
    try { 
      dispatch({ type: AUTH, data: {result, token}});
      navigate('/');
    } catch (error) {
      console.log(error)
    }
  }

  const googleFailure = (error) => {
    console.log(error);
    console.log("Masuk dengan Google gagal. Coba Lagi");
  }

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlienedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Daftar' : 'Masuk'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                    <Input name="name" label="Nama" handleChange={handleChange} autoFocus />
                </>
              )
            }
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword}/>
            { isSignup && <Input name="confirmPassword" label="Ulangi Password" handleChange={handleChange} type="password" />}
          </Grid>
          <Button type="submit" fullWidth variant='contained' color='primary' className={classes.submit}>{isSignup ? "Daftar": "Masuk"}</Button>
          <GoogleLogin onSuccess={googleSuccess} onError={googleFailure} width="364"/>
          <Button type='submit' onClick={switchMode} fullWidth  className={classes.switch}>
              {isSignup ? 'Sudah punya akun? Masuk' : 'Tidak punya akun? Daftar'}
          </Button>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth;