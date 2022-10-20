import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';


import { deleteSchool, likeSchool } from "../../../actions/schools";
import { useDispatch } from "react-redux";

import useStyles from './styles';

const Post = ({ school, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    return (
            <Card className={classes.card}>
                <CardMedia className={classes.media} image={school.selectedFile} title={school.name} />
                <div className={classes.overlay2}>
                    <Button style={{color: 'black'}} size="small" onClick={() => setCurrentId(school._id)}>
                        <MoreHorizIcon fontSize="medium" />
                    </Button>
                </div>
                <div className={classes.details}>
                    <Typography variant="body2" color="textSecondary">{school.tags.map((tag) => `#${tag} `)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{school.name}</Typography>
                <CardContent>
                    <Typography variant="body2" color="textSecondary" gutterBottom>{school.desc}</Typography>
                </CardContent>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" onClick={() => dispatch(likeSchool(school._id))}>
                        <ThumbUpAltIcon fontSize="small" /> &nbsp; {school.likeCount}
                    </Button>
                    <Button size="small" color="primary" onClick={() => dispatch(deleteSchool(school._id))}>
                        <DeleteIcon fontSize="small" />
                        Delete
                    </Button>
                </CardActions>
            </Card>
    )
};

export default Post;