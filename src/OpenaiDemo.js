//import Head from "next/head";
import React, { useState, useEffect } from "react";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import TextField from '@mui/material/TextField';
import {OpenAiTextCompletionApi, CallOpenaiImageApi} from "./CallOpenaiApi";
import { maxWidth } from "@mui/system";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


export default function Home() {      
  const [promptText, setPromptText] = useState("");  
  const [result, setResult] = useState("");
  const [textCompletionLoading, setTextCompletionLoading] = React.useState(false);

  const [imagePromptText, setImagePromptText] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageCompletionLoading, setImageCompletionLoading] = React.useState(false);

  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  const [radioValue, setRadioValue] = React.useState('256x256');
  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  async function onSubmit(event) {    
    event.preventDefault();    

    setTextCompletionLoading(true);
    setResult("");    
    const response = await OpenAiTextCompletionApi(promptText);      
    console.log(response)
    setResult( r => r + response.trim());    
    setPromptText("");    
    setTextCompletionLoading(false);
  }

  async function onSubmitImage(event) {
    event.preventDefault();    
    // setResult("");
    // const response = await OpenAiTextCompletionApi(promptText);      
    // console.log(response)
    // setResult( r => r + response.trim());
    // setPromptText("");
    setImageCompletionLoading(true);
    const response = await CallOpenaiImageApi(imagePromptText, radioValue);
    console.log(response);
    //setImageUrl( r => r + response.trim());
    setImageUrl(response);
    setImagePromptText("");
    setImageCompletionLoading(false);
  }

//   React.useEffect(()=>{
//     console.log(result)
//     setOutput1(...output1, result)
//   },[result])

  return (
    <div>
      {/* <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/dog.png" />
      </Head> */}
      <TabContext value={value}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Text Completion" value="1" />
            <Tab label="Image Generation" value="2" />            
          </TabList>
          <TabPanel value="1">
          <TextField label="Input Question" value={ promptText } style={{width:'100%', width:900, padding:10}}  multiline rows="2" InputLabelProps={{ shrink: true }} 
              onChange = { (e) => setPromptText(e.target.value) }            
          />
          <br />
          <LoadingButton
              style={{backgroundColor:'#e10000', margin:10}}
              //style={{backgroundColor:'#ff0000'}}
              onClick={ onSubmit }
              endIcon={<SendIcon />}
              loadingPosition="end"
              variant="contained"         
              loading = { textCompletionLoading  }
          >
              Get Result
          </LoadingButton>
          <br /><br />
          <TextField label="Result" value={ result } style={{width:'100%', width:900, padding:10}}  multiline rows="16" InputLabelProps={{ shrink: true }} />
          </TabPanel>
          
          <TabPanel value="2">
          
          <TextField label="Input Text For Image Generation" value={ imagePromptText } style={{width:'100%', width:900, padding:10}}  multiline rows="2" InputLabelProps={{ shrink: true }} 
              onChange = { (e) => setImagePromptText(e.target.value) }            
          />
          <br />

          <FormControl style={{padding:10}}>
            <FormLabel id="demo-row-radio-buttons-group-label">Image Size</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              value={radioValue}
              onChange={handleRadioChange}
            >
              <FormControlLabel value="256x256" control={<Radio />} label="256x256" />
              <FormControlLabel value="512x512" control={<Radio />} label="512x512" />
              <FormControlLabel value="1024x1024" control={<Radio />} label="1024x1024" />
            </RadioGroup>
          </FormControl>

          <br />
          <LoadingButton
              style={{backgroundColor:'#e10000', margin:10}}
              //style={{backgroundColor:'#ff0000'}}
              onClick={ onSubmitImage }
              endIcon={<SendIcon />}
              loadingPosition="end"
              variant="contained"
              loading={imageCompletionLoading}
          >
              Get Image
          </LoadingButton>
          <br />         
          <img src={ imageUrl } style={{margin : 10}} />
          </TabPanel>
        </TabContext>
    </div>
  );
}