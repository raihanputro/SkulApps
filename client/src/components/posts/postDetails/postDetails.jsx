import React, { useEffect } from "react";
import { Paper, Typography, CircularProgress, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import moment from 'moment';
import { useParams, useNavigate, Link } from "react-router-dom";
import useStyles from "./styles";
import CommentSection from "./commentSection";
import { getSchool } from "../../../actions/schools";

const SchoolDetails = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { school, schools, isLoading } = useSelector((state) => state.schools);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getSchool(id));
    }, [id]);

    if(!school) return "tidak ada sekolah";

    if(isLoading) {
        return (
            <Paper elevation={6} className={classes.loadingPaper}>
                <CircularProgress size="7em" />
            </Paper>
        )
    }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6} >
            <div className={classes.card}>
                <div className={classes.section}>
                <Typography variant="h3" component="h2">{school.name}</Typography>
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{school.tags.map((tag) => (
                    <Link to={`/tags/${tag}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                    {` #${tag} `}
                    </Link>
                ))}
                </Typography>
                <Typography gutterBottom variant="body1" component="p">{school.desc}</Typography>
                <Typography variant="h6">
                    Created by:
                    <Link to={`/authors/${school.authorName}`} style={{ textDecoration: 'none', color: '#3f51b5' }}>
                    {` ${school.authorName}`}
                    </Link>
                </Typography>
                <Typography variant="body1">{moment(school.createdAt).fromNow()}</Typography>
                <Divider style={{ margin: '20px 0' }} />
                <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                <Divider style={{ margin: '20px 0' }} />
                <CommentSection school={school} />
                <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} src={school.schoolImage} alt={school.name} />
                </div>
            </div>
        </Paper>
    )
}

export default SchoolDetails;