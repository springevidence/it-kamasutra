import React from 'react';
import style from './App.module.css';
import {AppBar, Box, Button, Container, Toolbar} from "@material-ui/core";
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import {TaskType} from "../api/todolists-api";
import {TodolistsList} from "../pages/TodolistList/TodolistsList";

export type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    console.log('App')

    return (
        <div className={style.app}>
            <Box sx={{flexGrow: 1}}>
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
                </AppBar>
            </Box>
            <Container fixed>
                <TodolistsList/>
            </Container>
        </div>
    );
}


export default App;
