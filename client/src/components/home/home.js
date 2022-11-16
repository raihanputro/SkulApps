import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper, AppBar, TextField, Button } from '@material-ui/core';
import { getSchools, getSchoolsBySearch } from '../../actions/schools';
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import ChipInput from 'material-ui-chip-input';
import Posts from '../posts/posts';
import Pagination from "../pagination/Pagination";
import Form from '../form/form';
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Home = () => {
    const classes = useStyles();

    const [currentId, setCurrentId] = useState(null);
    const dispatch = useDispatch();
    const query = useQuery();
    const navigate = useNavigate();
    const page = query.get('page') || 1;
    const searchQuery = query.get('searchQuery');
    const [search, setSearch] = useState('');
    const [tags, setTags] = useState([]);

    const searchSchool = () => {
        if(search.trim() || tags) {
            dispatch(getSchoolsBySearch({ search, tags: tags.join(',') }));
            navigate(`/schools/search?searchQuery=${search}&tags=${tags.join(',')}`);
        } else {
            navigate('/');
        }
    }

    const handleKeyPress = (e) => {
        if (e.keyCode === 13) {
            searchSchool();
        }
    }

    const handleAdd= (tag) => setTags([...tags, tag]);

    const handleDelete = (tagDelete) => setTags(tags.filter((tag) => tag !== tagDelete));

    return (
            <Grow in>
                <Container maxWidth="xl">
                    <Grid container justifyContent="space-between" alignItems="stretch" spacing={3} className={classes.gridContainer}>
                        <Grid item xs={12} sm={7} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>
                        <Grid item xs={12} sm={4} md={3}>
                            <AppBar className={classes.appBarSearch} position="static" color="inherit">
                                <TextField 
                                    name="search" 
                                    variant="outlined" 
                                    label="Cari Sekolah" 
                                    fullWidth 
                                    value={search} 
                                    onChange={(e) => setSearch(e.target.value)} 
                                    onKeyDown={handleKeyPress}
                                />
                                <ChipInput 
                                    style={{margin: "10px 0"}}
                                    value={tags} 
                                    onAdd={handleAdd}
                                    onDelete={handleDelete}
                                    label="Cari tags sekolah"
                                    variant="outlined"
                                />
                                <Button onClick={searchSchool} className={classes.searchButton} color="primary" variant="contained">Cari</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />
                            {(!searchQuery && !tags.length) && (
                                <Paper  elevation={6} className={classes.pagination}>
                                    <Pagination page={page} />
                                </Paper>
                            )}
                        </Grid>
                    </Grid>
                </Container>
            </Grow>
    )
}

export default Home;