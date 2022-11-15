import React, { useState, useEffect } from "react";
import FileBase from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import useStyles from './styles';
import { TextField, MenuItem, Button, Typography, Paper } from "@material-ui/core";
import { createSchool, updateSchool } from "../../actions/schools";

const Form = ({ currentId, setCurrentId }) => {
    const [schoolData, setSchoolData] = useState({name: '', npsn: '', status: '', addres: '', desc: '', tags: '', schoolImage: ''});
    const school = useSelector((state) => (currentId ? state.schools.find((s) => s._id === currentId) : null));
    const classes = useStyles();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        if(school) setSchoolData(school);
    }, [school]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId === 0) {
            dispatch(updateSchool(currentId, { ...schoolData, authorName: user?.result?.name }));
            clear();
        } else {
            dispatch(createSchool({ ...schoolData, authorName: user?.result?.name}, navigate));
            clear();
        }
    }

    if(!user?.result?.name) {
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">Silahkan masuk untuk membuat data sekolah!</Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null);
        setSchoolData({ name: '', npsn: '', status: '', addres: '', desc: '', tags: '', schoolImage: '' });
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
                <TextField name="name" variant="outlined" color="secondary" label="Nama Sekolah" fullWidth value={schoolData.name} onChange={(e) => setSchoolData({ ...schoolData, name: e.target.value })} helperText="Silahkan isi nama sekolah"/>
                <TextField name="npsn" variant="outlined" color="secondary" label="NPSN" fullWidth value={schoolData.npsn} onChange={(e) => setSchoolData({ ...schoolData, npsn: e.target.value })} helperText="Silahkan isi npsn sekolah"/>
                <TextField select name="status" variant="outlined" color="secondary" label="Status Sekolah" fullWidth value={schoolData.status} onChange={(e) => setSchoolData({ ...schoolData, status: e.target.value })} helperText="Silahkan isi status sekolah"> {statuses.map((option) => (<MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>))} </TextField>
                <TextField  name="addres" variant="outlined" color="secondary" label="Alamat Sekolah" fullWidth value={schoolData.addres} onChange={(e) => setSchoolData({ ...schoolData, addres: e.target.value })} helperText="Silahkan isi alamat sekolah"/>
                <TextField multiline name="desc" variant="outlined" color="secondary" label="Deskripsi Sekolah" fullWidth value={schoolData.desc} onChange={(e) => setSchoolData({ ...schoolData, desc: e.target.value })} helperText="Silahkan isi deskripsi sekolah"/>
                <TextField name="tags" variant="outlined" color="secondary" label="Tag Sekolah" fullWidth value={schoolData.tags} onChange={(e) => setSchoolData({ ...schoolData, tags: e.target.value.split(',') })} helperText="Silahkan isi tag sekolah (dipisahkan dengan tanda koma)"/>
                <div className={classes.fileInput}>
                    <FileBase type="file" multiple={false} onDone = {({ base64 }) => setSchoolData({ ...schoolData, schoolImage: base64 }) }/> 
                </div>
                <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Kirim</Button>
            </form>
        </Paper>
    )
};

export default Form;

