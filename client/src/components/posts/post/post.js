import React from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Fab } from '@material-ui/core';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useNavigate } from "react-router-dom";


import { deleteSchool, likeSchool } from "../../../actions/schools";
import { useDispatch } from "react-redux";

import useStyles from './styles';

const Post = ({ school, setCurrentId }) => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));
    const userId = user?.result?._id || user?.result?.sub;

    const Likes = () => {
        if(school.likes.length > 0) {
            return school.likes.find((like) => like === userId)
            ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp;{school.likes.length > 2 ? `Kamu dan ${school.likes.length -1} lain nya` : `${school.likes.length} like${school.likes.length > 1 ? 's' : ''}`}</>
            ) : (
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{school.likes.length} {school.likes.length === 1 ? 'Like' : 'Likes'}</>
            )
        }

        return <><ThumbUpAltIcon fontSize="small"/>&nbsp;Like</>;
    }

    const openSchoolPost = () => {
        navigate(`/schools/${school._id}`);
    };

    return (
            <Card className={classes.card} raised elevation={6}>
                <ButtonBase className={classes.cardAction} onClick={openSchoolPost} component="span">
                    <CardMedia className={classes.media} image={school?.schoolImage} title={school.name} />
                    {(user?.result?.sub === school?.authorId || user?.result?._id === school?.authorId) && (
                        <div className={classes.overlay2}>
                            <Button style={{color: 'white'}} size="small" onClick={() => setCurrentId(school._id)}>
                                <MoreHorizIcon fontSize="medium" />
                            </Button>
                        </div>
                    )}
                    <div className={classes.details}>
                        <Typography variant="body2" color="textSecondary">{school.tags.map((tag) => `#${tag} `)}</Typography>
                    </div>
                    <Typography className={classes.title} variant="h5" gutterBottom>{school.name}</Typography>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" gutterBottom>{school.desc}</Typography>
                    </CardContent>
                </ButtonBase>
                <CardActions className={classes.cardActions}>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likeSchool(school._id), navigate)}>
                        <Likes />
                    </Button>
                    {(user?.result?.sub === school?.authorId || user?.result?._id === school?.authorId) && (
                        <Button size="small" color="primary" onClick={() => dispatch(deleteSchool(school._id))}>
                            <DeleteIcon fontSize="small" />
                            Delete
                        </Button>
                    )}  
                </CardActions>
            </Card>
    )
};

export default Post;