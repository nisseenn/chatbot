import React, { useState, useRef } from 'react';
import { Outlet, Link } from "react-router-dom";
import { MdOutlineArrowBackIos } from 'react-icons/md';
import { AiOutlineUpload } from 'react-icons/ai';
import Typography from "@material-ui/core/Typography";
import { TextField, Button, FormControl, Select, MenuItem, InputLabel, FormHelperText } from "@material-ui/core";
import Slide from '@material-ui/core/Slide';
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@mui/material/Alert';
import axios from 'axios'

import avatar_female from './assets/avatar_female.png'
import avatar_male from './assets/avatar_male.jpeg'
import avatar_nogender from './assets/avatar_nogender.jpeg'

import './App.css';

const Male = "Male"
const Female = "Female"
const No_gender = "No_gender"

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

let FLASK_URL = "http://localhost:5000"

const Wizard = () => {

    const hiddenInput = useRef()

    const [avatarName, setAvatarName] = useState('')
    const [gender, setGender] = useState('')
    const [avatar, setAvatar] = useState('')
    const [initialStep, setInitialStep] = useState(true)
    const [secondStep, setSecondStep] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    const [firstSlide, setFirstSlide] = useState('left')
    const [secondSlide, setSecondSlide] = useState('left')

    const [selectedFile, setSelectedFile] = useState();
	const [isFilePicked, setIsFilePicked] = useState(false);
    const [changeColor, setChangeColor] = useState(false)
    const [isUploading, setIsUploading] = useState(false)
    
    const handleChange = (event) => {
        setGender(event.target.value);
        if(event.target.value === Male){
            setAvatar(avatar_male)
        }else if(event.target.value === Female){
            setAvatar(avatar_female)
        }else if(event.target.value === No_gender){
            setAvatar(avatar_nogender)
        }
    };

    const handleInput = (event) => {
        setAvatarName(event.target.value);
    };

    const handleGoBack = () => {
        setFirstSlide('right')
        setSecondSlide('left')
        setSecondStep(false)
        setInitialStep(true)
    }

    const handleNext = () => {
        setSecondSlide('left')
        setFirstSlide('right')
        setInitialStep(false)
        setSecondStep(true)
    }

    const handleUploadFile = () => {
        hiddenInput.current.click();
    }

    const changeHandler = (event) => {
        setIsUploading(true)
        const fileExtention = event.target.files[0].type
        const fileName = event.target.files[0].name
        if(fileExtention === "application/x-yaml"){
            event.preventDefault();
            const formData = new FormData();
            formData.append("file", event.target.files[0]);
            formData.append("filename", fileName)

            axios
            .post(FLASK_URL+"/submit_file", formData)
            .then(res => {
                if(res.status === 200){
                    console.log(res)
                    setIsFilePicked(true);
                    setIsUploading(false)
                }
            })
            .catch(err => {
                console.log(err)
            });
        }else{            
            setShowAlert(true)
            setIsUploading(false)
        }
	};

    return (
        <div style={{ zindex: 1000, backgroundColor: 'blanchedalmond', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
            <div style={{ 
            boxShadow: '0px 5px 10px rgba(0,0,0,0.2)',
            backgroundColor: "#fff",
            borderRadius: 10,
            position: 'absolute',
            padding: '2vw',
            height: '50vh',
            width: '50vw',
            display: 'flex',
            overflow: 'hidden',
            zIndex: 1000,
            flexDirection: 'row',
            }}>

            <Slide direction={firstSlide} in={initialStep}>
                <div style={{ flex: 1, flexDirection: 'row', display: 'flex' }}>
                    <div key="transition-group-content" style={{ flex: 1, alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                        <Typography style={{ }} variant="h4">Set up your chatbot</Typography>

                        <div style={{ marginTop: '2vw' }}>
                            <Typography style={{ }} variant="h6">Choose a gender for your chatbot</Typography>
                            <FormControl error={gender ? false : true} required style={{ width: '15vw', marginTop: '1vw' }} >
                                {/* <InputLabel id="demo-simple-select-label">Gender</InputLabel> */}
                                <Select
                                    // style={{ backgroundColor: "#FFF" }}
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={gender}
                                    label="Gender"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={Male}>Male</MenuItem>
                                    <MenuItem value={Female}>Female</MenuItem>
                                    <MenuItem value={No_gender}>No gender</MenuItem>
                                </Select>
                                <FormHelperText>Required</FormHelperText>
                            </FormControl>
                        </div>

                        <div style={{ marginTop: '2vw', display: 'flex', flexDirection: 'column' }}>
                            <Typography style={{  }} variant="h6">Choose a name for your chatbot</Typography>
                            <TextField 
                            required 
                            value={avatarName}
                            onChange={handleInput}
                            inputProps={{ maxLength: 20 }}
                            style={{ marginTop: '1vw', width: '15vw'}} 
                            id="outlined-basic" 
                            label="Name of chatbot" 
                            variant="outlined" />
                            <Button 
                            onClick={handleNext}
                            disabled={avatarName.length > 0 ? false : true} 
                            style={avatarName.length > 0 ? { marginTop: '1vw', width: '15vw', backgroundColor: "#68a4ff", fontWeight: 'bold', color: "#FFF" } : {marginTop: '1vw', width: '15vw', fontWeight: 'bold'}} 
                            variant="contained">
                            Next
                            </Button>
                        </div>
                    </div>

                    <div key="transition-group-content2" style={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
                        {avatar ? (
                            <img style={{ width: '10vw', height: '10vw', borderRadius: 300 }} src={avatar} alt="Logo" />
                        ) : (
                            <img style={{ width: '10vw', height: '10vw', borderRadius: 300 }} src={avatar_nogender} alt="Logo" />
                        )}
                        {avatarName.length > 0 ? (
                            <Typography style={{ marginTop: 30 }} variant="h5">{avatarName}</Typography>
                        ) : (
                            <Typography style={{ marginTop: 30 }} variant="h5">No name chosen</Typography>
                        )}
                    </div>
                </div>
            </Slide>

            <Slide direction={secondSlide} in={secondStep} >
                    <div style={{ position: 'absolute', zIndex: 100 }}>
                        <div style={{ }}>
                            <Button onClick={handleGoBack}>
                                <MdOutlineArrowBackIos style={{ marginRight: 5 }} size="1vw" />
                            </Button>
                        </div>
                        <div style={{ width: '50vw', height: '50vh', justifyContent: 'center', alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                            
                            {showAlert ? (
                                <Alert style={{ position: 'absolute', top: 0 }} onClose={() => setShowAlert(false)} severity="error">The file format needs to be .yml</Alert>
                            ) : (
                                <div />
                            )}

                            <Typography style={{ }} variant="h5">Upload semantic model</Typography>
                            <Button onMouseEnter={() => setChangeColor(true)} onMouseLeave={() => setChangeColor(false)} style={changeColor ? { marginTop: '2vw', backgroundColor: "#68a4ff", padding: '2vw', borderRadius: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' } : { marginTop: '2vw', backgroundColor: "#eaeaea", padding: '2vw', borderRadius: 300, display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={handleUploadFile}>
                                    {isUploading ? (
                                        <CircularProgress size="3vw" style={{ position: 'absolute' }} />
                                    ) : (
                                        <AiOutlineUpload style={changeColor ? { color: "#FFF"} : {color: "#000"}} size="3vw" />
                                    )}
                            </Button>
                            <input 
                            ref={hiddenInput} 
                            type="file" 
                            name="file" 
                            style={{display: 'none'}} 
                            onChange={changeHandler} />
                            
                        </div>
                    </div>
            </Slide>
            </div>
        </div>
    );
}

export default Wizard;