import React from "react";
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector } from "react-redux";


import Post from './post/post';
import useStyles from './styles';

const Posts = ({ setCurrentId }) => {
    const { schools, isLoading } = useSelector((state) => state.schools);
    const classes = useStyles();

    if(!schools.length && !isLoading) return 'Tidak ada postingan sekolah!';
    
    return (
        isLoading ? <CircularProgress /> : (
            <Grid className={classes.container} container alignItems="stretch" spacing={3}>
                {schools.map((school) => (
                    <Grid key={school._id} item xs={12} sm={12} md={6} lg={4}>
                        <Post school={school} setCurrentId={setCurrentId} />
                    </Grid>
                ))}
            </Grid>
        )
    );
}

export default Posts;