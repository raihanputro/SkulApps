import React, { useEffect} from "react";
import { Pagination, PaginationItem } from '@material-ui/lab';
import useStyles from './styles';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getSchools } from "../../actions/schools";

const Paginate = ({ page }) => {
    const classes = useStyles();
    const dispatch = useDispatch();

    const { numberOfPage } = useSelector((state) => state.schools);

    useEffect(() => {
        if(page) {
            dispatch(getSchools(page));
        } 
    }, [page]);

    return (
        <Pagination 
            classes = {{ ul: classes.ul }} 
            count={numberOfPage} 
            page={Number(page) || 1} 
            variant="outlined" 
            color="primary" 
            renderItem={(item) => (<PaginationItem {...item} component={Link} to={`/schools?page=${item.page}`} />)} 
        />
    )
}


export default Paginate;
