import React from 'react';
import style from './App.module.css';
import {AppBar, Box, Button, Container, Toolbar} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../pages/TodolistList/TodolistsList";
import {LinearProgress} from "@mui/material";
import ErrorSnackbar from "../components/ErrorSnackbar/ErrorSnackbar";
import {useSelector} from "react-redux";
import {AppRootStateType} from "./store";
import {RequestStatusType} from "./app-reducer";



type PropsType = {
    demo?: boolean
}
function App({demo = false}: PropsType) {
    console.log('App')

    const status = useSelector<AppRootStateType, RequestStatusType>(state => state.app.status)

    return (
        <div className={style.app}>
            <Box sx={{flexGrow: 1}}>
                <ErrorSnackbar/>
                <AppBar position="static" color={"inherit"}>
                    <Toolbar>
                        <IconButton
                            size={"large"}
                            edge={"start"}
                            color={"inherit"}
                            aria-label={"menu"}
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
                        <Typography variant={"h6"} component={"div"} sx={{flexGrow: 1}}>
                            Your Board
                        </Typography>
                        <Button color="inherit">Login</Button>
                    </Toolbar>
                    {status === 'loading' && <LinearProgress />}
                </AppBar>
            </Box>
            <Container fixed>
                <TodolistsList demo={demo}/>
            </Container>
        </div>
    );
}


export default App;
