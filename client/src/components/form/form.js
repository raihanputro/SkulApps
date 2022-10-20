import React, { useState, useEffect } from "react";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';

import useStyles from './styles';
import { TextField, MenuItem, Button, Typography, Paper } from "@material-ui/core";
import { createSchool, updateSchool } from "../../actions/schools";

const Form = ({ currentId, setCurrentId }) => {
    const [schoolData, setSchoolData] = useState({name: '', npsn: '', status: '', addres: '', desc: '', author: '', tags: '', selectedFile: ''});
    const school = useSelector((state) => (currentId ? state.schools.find((s) => s._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();

    useEffect(() => {
        if(school) setSchoolData(school);
    }, [school]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId) {
            dispatch(updateSchool(currentId, schoolData));
            clear();
        } else {
            dispatch(createSchool(schoolData));
            clear();
        }
    }

    const clear = () => {
        setCurrentId(null);
        setSchoolData({ name: '', npsn: '', status: '', addres: '', desc: '', author: '', tags: '', selectedFile: '' });
    }

    const statuses = [
        {
            value: 'Negeri',
            label: 'Negeri'
        },
        {
            value: 'Swasta',
            label: 'Swasta'
        }
    ]

    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">{ currentId ? `Edit ${school.name}` : 'Masukkan Sekolah'}</Typography>
                <TextField name="author" variant="outlined" color="secondary" label="Penulis" fullWidth value={schoolData.author} onChange={(e) => setSchoolData({ ...schoolData, author: e.target.value })} helperText="Silahkan isi nama penulis"/>
                <TextField name="name" variant="outlined" color="secondary" label="Nama Sekolah" fullWidth value={schoolData.name} onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })} helperText="Silahkan isi nama sekolah"/>
                <TextField name="npsn" variant="outlined" color="secondary" label="NPSN" fullWidth value={schoolData.npsn} onChange={(e) => setSchoolData({ ...schoolData, npsn: e.target.value })} helperText="Silahkan isi npsn sekolah"/>
                <TextField select name="status" variant="outlined" color="secondary" label="Status Sekolah" fullWidth value={schoolData.status} onChange={(e) => setSchoolData({ ...schoolData, status: e.target.value })} helperText="Silahkan isi status sekolah"> {statuses.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))} </TextField>
                <TextField  name="addres" variant="outlined" color="secondary" label="Alamat Sekolah" fullWidth value={schoolData.addres} onChange={(e) => setSchoolData({ ...schoolData, addres: e.target.value })} helperText="Silahkan isi alamat sekolah"/>
                <TextField multiline name="desc" variant="outlined" color="secondary" label="Deskripsi Sekolah" fullWidth value={schoolData.desc} onChange={(e) => setSchoolData({ ...schoolData, desc: e.target.value })} helperText="Silahkan isi deskripsi sekolah"/>
                <TextField name="tags" variant="outlined" color="secondary" label="Tag Sekolah" fullWidth value={schoolData.tags} onChange={(e) => setSchoolData({ ...schoolData, tags: e.target.value.split(',') })} helperText="Silahkan isi tag sekolah"/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone = {({ base64 }) => setSchoolData({ ...schoolData, selectedFile: base64 }) }/> 
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Kirim</Button>
            </form>
        </Paper>
    )
};

export default Form;

