import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";


import Post from './post/post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const schools = useSelector((state) => state.schools);
    const classes = useStyles();

    console.log(schools);
    
    return (
        !schools.length ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {schools.map((school) => (
                    <Grid key={school._id} item xs={12} sm={6}>
                        <Post school={school} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;