import React, { useState } from "react";
import './App.css';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box, { BoxProps } from '@mui/material/Box';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

// Import React FilePond
import { FilePond, File, registerPlugin } from 'react-filepond'
// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { ContactSupportOutlined } from "@mui/icons-material";

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview, FilePondPluginFileEncode)
//FilePond.registerPlugin(FilePondPluginFileEncode);

  
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function App() {
  const [livenessToken, setLivenessToken] = useState("")
  const [livenessConfig, setLivenessConfig] = useState("")

  const [livenessData, setLivenessData] = useState("")
  const [livenessDataHash, setLivenessDataHash] = useState("")
  const [livenessStatus, setLivenessStatus] = useState(false)
  const [livenessThumbnail, setLivenessThumbnail] = useState()
  const [livenessErrors, setLivenessErrors] = useState("")
  
  const [files, setFiles] = useState([]) 
  
  const [passportData,setPassportData] = useState({
    emailAddress :"one@Test.com",
    subscriberId : null,
    subscriberDocuments :
    [
      {
         identifierType :2,
         documentCode :"P<",
         issuingAuthority :"ARE",
         documentNumber :"P123456",
         registrantNumber :"",
         documentIssueDate :"2012-04-15",
         expiryDate :"2031-10-13",
         primaryIdentifier :"GEORGE",
         secondaryIdentifier :"FEDERICK",
         birthDate :"1974-08-12",
         gender :"M",
         documentNationality :"ARE",
         mrz :{            
               line1 :"P<AREABDULLAH<<AHMAD<MOHAMAD<<<<<<<<<<<<<<<<",
               line2 :"L898902C36ARE7408122F1204159ZE184226B<<<<<10",
               line3 :"ABDULLAH<<AHMAD<MOHAMAD<<<<<<<"
            },
        dataPageScan : "",
        secondPageScan :"",
        nfcPortrait :"",
        nfcSignature :"",
        croppedPortrait :"",
      } ,    
    ],
    face:[
        {
          data: "",
          dataHash: "",
          tag: "SHA256"          
        }
    ]
  })

  const [subscriptionData, setSubscriptionData] = useState({
    subscriberId: -9223372036854775744,
    intermediaryTransactionId: "{{intermediaryTransactionId}}",
    subscriptions: [
      {
        phoneNumber: "529866081",
        lineType: 1,
        serviceType: 1,
        channelType: 1,
        address: "Khalifa City A, Abu Dhabi, UAE"
      }
    ]
  })

  const [serviceData, setServiceData] = useState({
    intermediaryTransactionId: "{{intermediaryTransactionId}}",
    subscriptionServices: [
      {
        subscriptionNumber : -9223372036854775797,
        services: [
          -2147483642
        ]
      }
    ]
  })

  //const [livenessCheckLoading, setLivenessCheckLoading] = useState(false)
  
  //let rhservAuthToken = "";
  let config = "";
  let livenessChekList = [
    // "SMILE",
    "CLOSE_EYES_AND_OPEN",
    //"TURN_HEAD_TO_LEFT",
    //"TURN_HEAD_TO_RIGHT",
    // "ZOOM_OUT",
    // "ZOOM_IN",
    //"RAISE_HEAD_UP",
  ];
  
  let baseUrl = `https://etisalatssms.server.aicenter.ae/`;
  let credentials = {
    username: "dev.etisalat@tdra.ae",
    password: "L5Wq@V3ns",
  };
  let langIdentifiers = {
    record_button: "Record",
    result_close_button: "Close",
    alert_close_button: "OK",
    action_photo_button: "Take photo",
    action_confirm_button: "Confirm",
    action_repeat_button: "Repeat",
    action_skip_button: "Skip",
    action_camera_switch_button: "Switch camera",
    analysis_in_progress: "Analyzing, please wait for result",
    accessing_camera: "Accessing Camera. It may take few seconds.",
    device_turn: "Please turn your device",
    more_than_one_face: "Make sure there are no other faces",
    number_of_attempts_exhausted: "Number of attempts exhausted",
    result_state_processing: "Analysis in progress",
    result_state_finished: "Analysis complete",
    action_hint_not_centered: "Align your face with the frame",
    action_hint_move_closer: "Closer",
    action_hint_move_away: "Move away",
    action_hint_move_even_closer: "Even closer",
    action_hint_move_even_away: "Even further",
    action_hint_look_straight: "Turn your face straight to the camera",
    action_hint_dont_smile:
      "Will ask you to smile later; don't smile now please",
    action_hint_dont_left_or_right_head:
      "Will ask you to turn head later; Look straight at the camera now please",
    action_hint_open_eyes_wide: "Open your eyes wide",
    action_hint_face_aligned: "Great, don't move",
    action_hint_remove_sunglasses: "Please, take off the sunglasses",
    action_hint_remove_mask: "Please, take off the mask",
    action_repeat: "Please repeat the action",
    action_tutorial_button: "Instruction",
    action_zoom_in_go: "Move your face closer to the screen",
    action_zoom_out_go: "Move your face farther from the screen",
    action_smile_go: "Smile",
    action_blink_go: "Close your eyes and open them",
    action_head_up_go: "Raise your head up",
    action_head_down_go: "Lower your head down",
    action_head_right_go: "TURNING YOUR HEAD, look to your right",
    action_head_left_go: "TURNING YOUR HEAD, look to your left",
    action_look_at_screen: "Look at the screen",
    action_hint_too_dark: "Find better lighting conditions",
    action_hint_too_blurry: "The image is too blurry",
    action_hint_OK: "Great!",
    action_hint_OK_intermediate: "Great, don't move",
    processing_data: "Processing data",
    uploading_data: "Uploading data",
    requesting_result: "Requesting results",
    network_video_analyses_status_failed: "Analysis error",
    network_upload_status_processing: "Uploading video…",
    network_upload_status_done: "Video uploaded",
    network_upload_status_failed: "Upload error",
    network_upload_status_processing_image: "Uploading photo…",
    network_upload_status_done_image: "Photo uploaded",
    network_upload_status_failed_image: "Upload error",
    network_video_analyses_status_analyse_is: "Analysis ",
    network_video_analyses_status_analyse_is_processing:
      "Analysis is in progress",
    network_request_failed: "Request error",
    alert_dialog_fail_action_title: "Requested action is not detected",
    check_internet_connection: "No internet connection",
    see_on_this_text: "Look at this text",
    doc_upload_button: "Upload an image",
    doc_button_separator: "– or –",
    doc_capture_button: "Take a photo",
    error_no_camera: "Error: Unable to access the camera.",
    error_no_camera_ios:
      "Error: Unable to access the camera. <br/> Please use default browser (Safari).",
    error_bad_camera: "Error: Unable to use the camera.",
    error_slow_backend:
      "This browser doesn't support some important features. <br /><br /> For your convenience, please open this page in another browser.",
    error_data_upload: "Upload error.",
    error_result: "Result error.",
    error_unknown: "Unknown error.",
    error_upload_too_big: "Error: File size limit exceeded.",
    error_upload_unknown: "Error: Unable to process the file.",
  };

  function initializeSDK(configValue, secretKey) {
    window && window.EfrSDK.getInstance.initialize({
      configValue: configValue,
      secretKey: secretKey,
      on_success: function (result) {
        window && window.EfrSDK.getInstance.setLivenessChecks(livenessChekList);
        window && window.EfrSDK.getInstance.setLocale(langIdentifiers);
        window && window.EfrSDK.getInstance.setTimeout(30);
        //document.getElementById("initialize-face-capture").style.display = "block";
        console.log(
          window && window.EfrSDK.getInstance.getVersion(),
          window && window.EfrSDK.getInstance.getExpiryDate()
        );
        console.log("===================");
      },
      on_error: function (error) {
        // var previewContainer = document.createElement("div");
        // previewContainer.id = "image-preview-container"; // var previewContainer = document.getElementById('image-preview-container');

        // previewContainer.innerHTML = "";
        // document.querySelector("body").appendChild(previewContainer);
        // document.getElementById("initialize-face-capture").style.display =
        //   "none";
        
        // var h1 = document.createElement("H1");
        // var t1 = document.createTextNode("message : " + error.message);
        // h1.style.cssText =
        //   "text-align:center;font: 19px / 37px Segoe UI;color:#000;font-weight:bold;margin:0";
        // h1.appendChild(t1);
        setLivenessErrors(error.code + " - " + error.message)

        // var h2 = document.createElement("H1");
        // var t2 = document.createTextNode("Code : " + error.code);
        // h2.style.cssText =
        //   "text-align:center;font: 19px / 37px Segoe UI;color:#000;font-weight:bold;margin:0";
        // h2.appendChild(t2);

        // previewContainer.append(h1);
        // previewContainer.append(h2);
        console.log(error);
      },
    });
  }


  const feedBackHandler = async (feedBack) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("Authorization", "Bearer " + livenessToken);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: feedBack,
      redirect: "follow",
    };
    let response = await fetch(baseUrl + "sdk/liveness", requestOptions);
    
    if (response.ok && response.status == 200) {
      let resposeJson = await response.json();
      EfrSDK.getInstance.executeFeedback({
        data: resposeJson.data,
        on_result: function (result) {
          resultCallback(result);
        },
      });
    }
  };

  // const feedBackHandler = async (feedBack) => {
  //   console.log(feedBack)
  //   var myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "text/plain");
  //   myHeaders.append("Authorization", "Bearer " + rhservAuthToken);
  //   var requestOptions = {
  //     method: "POST",
  //     headers: myHeaders,
  //     body: feedBack,
  //     redirect: "follow",
  //   };
  //   let response = await fetch(baseUrl + "sdk/liveness", requestOptions);
  //   console.log("feedback handler called")
  //   console.log(response)
  //   if (response.ok && response.status == 200) {
  //     console.log("feedback handler called1")
  //     let resposeJson = await response.json();
  //     window && window.EfrSDK.getInstance.executeFeedback({
  //       data: resposeJson.data,
  //       on_result: function (result) {              
  //         resultCallback(result);
  //       },
  //     });
  //   }
  // };
  
  const rhservrLogin = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        email: credentials.username,
        password: credentials.password,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      let result = await fetch(
        baseUrl + "auth/access/login",
        requestOptions
      );
      
      if (result.status === 200) {
        result.json().then((data) => {
          if (data.succeeded == true) {
            //rhservAuthToken = data.data.token;
            setLivenessToken(data.data.token)
            getPureliveConfig(data.data.token);
          } else {
            alert("RHServ Api : " + data.errors[0]);
          }
        });
      } else {
        result.json().then((data) => {
          alert("RHServ Api : " + data.errors[0].message);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  const setSecretKey = async (token) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      let result = await fetch(
        baseUrl + "rhapi/Mgmt/GetTemporaryKey",
        requestOptions
      );

      if (result.status === 200) {
        await result.json().then((secretKey) => {
          initializeSDK(config, secretKey);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  async function resultCallback(finalResult) {
    console.log("finalResult")
    console.log(finalResult)
    if (finalResult.status == false) {
      setLivenessErrors(finalResult.errors[0].code + " - " + finalResult.errors[0].message)
      return;
    }

    if (finalResult.status === true && finalResult.data !== "") {
      setLivenessStatus(finalResult.status)
      setLivenessData(finalResult.data)
      setLivenessDataHash(finalResult.datahash)
      setLivenessThumbnail(finalResult.thumbnail)      
    }
  }

  const getPureliveConfig = async (token) => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Authorization", "Bearer " + token);
      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };
      let result = await fetch(
        baseUrl + "sdk/configuration",
        requestOptions
      );
      
      if (result.status === 200) {
        await result.json().then((resultConfig) => {
          if (resultConfig) {
            config = resultConfig.data;
            setLivenessConfig(resultConfig.data)
            setSecretKey(token);
          }
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  function startProcess() {
    window && window.EfrSDK.getInstance.startProcess({
      on_progress: function () {
        //setLivenessCheckLoading(true)
        document.getElementById("loader").style.display = "block";
      },
      on_feedback: function (result) {
        //setLivenessCheckLoading(false)
        feedBackHandler(result);
      },
      on_error: function (error) {
        //setLivenessCheckLoading(false)
        document.getElementById("loader").style.display = "none";
        console.log(error);
      },
      on_close: function () {
        //setLivenessCheckLoading(false)
        console.log("on_close========");
      },
      on_timeout: function () {
        //setLivenessCheckLoading(false)
        console.log("on_timeout========");
      },
    });
  }

  const handleLivenessCheck = () => {
    setLivenessStatus('')
    setLivenessData('')
    setLivenessDataHash('')
    setLivenessErrors('')
    setLivenessThumbnail('')
    //if (document.getElementById("image-preview-container"))
    //  document.getElementById("image-preview-container").remove(); //return;    
    startProcess();
  }

  const sendPassportData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + livenessToken);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(passportData),
      redirect: "follow",
    };
    let response = await fetch(baseUrl + "api/v1/Subscriber/FaceOnboarding", requestOptions);

    if (response.status === 200) {
      response.json().then((data) => {
        console.log(data)
      })
    }
    else
    {
      response.json().then((data) => {
        alert("Send Passport Data Api : " + data.errors[0].message);
      });
    }
  };


  React.useEffect(()=>{
    rhservrLogin();
  },[])

  React.useEffect(()=>{
    console.log(livenessData)

    setPassportData({ ...passportData ,  
      subscriberDocuments:  
        [...passportData.subscriberDocuments].map(obj =>{
            return {
              ...obj,
              nfcPortrait : livenessData,
              croppedPortrait : livenessData,
            }
        })      
    })    

    setPassportData({ ...passportData ,  
      face:  
        [...passportData.face].map(obj =>{
            return {
              ...obj,
              data : livenessData,
            }
        })
    })

  },[livenessData])

  React.useEffect(()=>{
    console.log(livenessDataHash)

    setPassportData({ ...passportData ,  
      face:  
        [...passportData.face].map(obj =>{
            return {
              ...obj,
              dataHash : livenessDataHash,
            }
        })
    })

  },[livenessDataHash])

  React.useEffect(()=>{
    console.log(livenessStatus)
  },[livenessStatus])

  React.useEffect(()=>{
    console.log(livenessThumbnail)
  },[livenessThumbnail])

  React.useEffect(()=>{
    //console.log(files[0]?.getFileEncodeBase64String())
    //console.log(passportData)
    //setPassportData({ ...passportData ,  subscriberDocuments: { ...passportData.subscriberDocuments, [passportData.subscriberDocuments[0].documentCode] : files[0]?.getFileEncodeBase64String() } })    
    //setPassportData({ ...passportData ,  subscriberDocuments: { ...passportData.subscriberDocuments[0], documentCode : files[0]?.getFileEncodeBase64String() } })    
    setPassportData({ ...passportData ,  
      subscriberDocuments:  
        [...passportData.subscriberDocuments].map(obj =>{
            return {
              ...obj,
              dataPageScan : files[0]?.getFileEncodeBase64String()  
            }
        })      
    })    

    //console.log(files. getFileEncodeBase64String())
  },[files])

  React.useEffect(()=>{
    console.log(JSON.stringify(passportData))
  },[passportData])


  React.useEffect(()=>{
    console.log(livenessErrors)
  },[livenessErrors])


  
  return (
    // <Container maxWidth="lg">
    <Box sx={{ width: '100%', margin:'3%'}}>
      <div className="loader" id="loader"></div>
      <div id="image-crop-container"></div>
      <p />
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid Item xs={5}>          
          <Item>          
            <LoadingButton
              style={{backgroundColor:'#e10000'}}
              //style={{backgroundColor:'#ff0000'}}
              onClick={handleLivenessCheck}
              endIcon={<SendIcon />}
              //loading={livenessCheckLoading}
              loadingPosition="end"
              variant="contained"          
            >
              Check Liveness
            </LoadingButton>
          </Item>          
          <Item>
            <div style={{color:'red'}}>{livenessErrors}</div>
            <img src={livenessThumbnail} />
          </Item>
          <Item>
            <Stack direction="row" spacing={2}>
              <TextField disabled label="Status" defaultValue={livenessStatus} style={{width:'100%'}} />
              <TextField disabled label="Liveness Data Hash" defaultValue={livenessDataHash} style={{width:'100%'}} />
            </Stack>
          </Item>
          <Item>
            <TextField disabled label="Liveness Data" defaultValue={livenessData} style={{width:'100%'}}  multiline rows="6" />
          </Item>
          {/* <Item>
            <TextField disabled label="Liveness Data Hash" defaultValue={livenessDataHash} />
          </Item> */}          
        </Grid>    
        <Grid xs={6}>
          <Item style={{width:'100%'}}>            
            <Stack direction="row" spacing={2}>
              <TextField label="Email" defaultValue={"one@Test.com"} style={{width:'100%'}} 
              onChange = { e => setPassportData({ ...passportData , emailAddress : e.target.value}) }   
              />
              <TextField label="Subscriber Id" defaultValue={""} style={{width:'100%'}} 
              onChange = { e => setPassportData({ ...passportData , subscriberId : e.target.value}) }   
              />
            </Stack>            
          </Item>
          <Item style={{width:'100%'}}>            
            <Stack direction="row" spacing={2}>
              <TextField label="Document Code" defaultValue={"P<"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          documentCode : e.target.value,
                        }
                    })      
                })                    
               } }     
              />
              <TextField label="Issuing Authority" defaultValue={"ARE"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          issuingAuthority : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <TextField label="Document Number" defaultValue={"P123456"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          documentNumber : e.target.value,
                        }
                    })      
                })                    
               } }    
              />  
              <TextField label="Registrant Number" defaultValue={""}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          registrantNumber : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
            </Stack>            
          </Item>
          <Item style={{width:'100%'}}>
            <Stack direction="row" spacing={2}>              
              <TextField label="Document Issue Date" defaultValue={"2012-04-15"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          documentIssueDate : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <TextField label="Expiry Date" defaultValue={"2031-10-13"}  
               onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          expiryDate : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <TextField label="Primary Identifier" defaultValue={"GEORGE"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          primaryIdentifier : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <TextField label="Secondary Identifier" defaultValue={"FEDERICK"} 
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          secondaryIdentifier : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
            </Stack>       
          </Item>
          <Item style={{width:'100%'}}>
            <Stack direction="row" spacing={2}>              
              <TextField label="Birth Date" defaultValue={"1974-08-12"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          birthDate : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <TextField label="Gender" defaultValue={"M"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          gender : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <TextField label="Document Nationality" defaultValue={"ARE"}  
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          documentNationality : e.target.value,
                        }
                    })      
                })                    
               } }    
              />
              <div style={{width:"25%"}} />
            </Stack>       
          </Item>
          <Item style={{width:'100%'}}>
              <TextField label="Line 1" defaultValue={"P<AREABDULLAH<<AHMAD<MOHAMAD<<<<<<<<<<<<<<<<"} style={{width:'100%'}} 
               onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          mrz : { ...obj.mrz, line1 : e.target.value }
                        }
                    })      
                })                    
               } }    
              />
          </Item> 
          <Item style={{width:'100%'}}>
              <TextField label="Line 2" defaultValue={"L898902C36ARE7408122F1204159ZE184226B<<<<<10"} style={{width:'100%'}} 
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          mrz : { ...obj.mrz, line2 : e.target.value }
                        }
                    })      
                })                    
               } }    
              />
          </Item> 
          <Item style={{width:'100%'}}>
              <TextField label="Line 3" defaultValue={"ABDULLAH<<AHMAD<MOHAMAD<<<<<<<"} style={{width:'100%'}} 
              onChange = { e => { 
                setPassportData({ ...passportData ,  
                  subscriberDocuments:  
                    [...passportData.subscriberDocuments].map(obj =>{
                        return {
                          ...obj,
                          mrz : { ...obj.mrz, line3 : e.target.value }
                        }
                    })      
                })                    
               } }    
              />
          </Item> 
          <Item style={{width:'100%'}}>
            <FilePond
              files={files}
              onupdatefiles={setFiles}
              //allowMultiple={true}
              maxFiles={1}
              //server="/api"
              name="files"  // sets the file input name, it's filepond by default 
              labelIdle='Upload Passport Image'
              allowFileEncode={true}
            />

          <LoadingButton
              style={{backgroundColor:'#e10000'}}
              //style={{backgroundColor:'#ff0000'}}
              onClick={ sendPassportData }
              endIcon={<SendIcon />}
              disabled = { livenessData == "" ? true : false }
              //loading={livenessCheckLoading}
              loadingPosition="end"
              variant="contained"          
            >
              Send Passport Data
            </LoadingButton>
          </Item>
       
        </Grid>
        {/* <Grid xs={6}>
          <Item>3</Item>
        </Grid>
        <Grid xs={6}>
          <Item>4</Item>
        </Grid> */}
      </Grid>
     </Box> 
    // </Container>
    // <div className="App">   
    //   {/* <button id="initialize-face-capture" style={{display:'none', width:300, height:50, margin:'20px auto',borderRadius:8,cursor:'pointer'}} onClick={handleStartLives}>
    //   START Liveness check
    //   </button> */}
    //    <LoadingButton
    //       style={{backgroundColor:'#e10000'}}
    //       //style={{backgroundColor:'#ff0000'}}
    //       onClick={handleStartLives}
    //       endIcon={<SendIcon />}
    //       //loading={livenessCheckLoading}
    //       loadingPosition="end"
    //       variant="contained"          
    //     >
    //       Check Liveness
    //     </LoadingButton>

    //   <div id="image-crop-container"></div>

    //   <div className="loader" id="loader"></div>

    //   <div style={{color:'red'}}>{livenessErrors}</div>

    //   <TextField
    //       disabled
    //       id="outlined-disabled"
    //       label="Status"
    //       defaultValue={livenessStatus}
    //   />

    //   {/* <textarea values= {"11 : " + livenessStatus} /> */}
    //   {/* <div>Liveness Status</div>
    //   <input
    //     type="text"
    //     value={livenessStatus}
    //   /> */}
    //   {/* <p /> */}

    //   <TextField
    //       disabled
    //       id="outlined-disabled"
    //       label="Liveness Data" 
    //       defaultValue={livenessData}
    //       multiline
    //   />
    //   {/* <div>Liveness Data</div>
    //   <textarea
    //     style= {{width:500, height: 100}}
    //     type="text"
    //     value={livenessData}
    //   /> */}
    //   <TextField
    //       disabled
    //       id="outlined-disabled"
    //       label="Liveness Data Hash"
    //       defaultValue={livenessDataHash}
    //   />

    //   {/* <p />
    //   <div>Liveness Data Hash</div>
    //   <input
    //     type="text"
    //     value={livenessDataHash}
    //   /> */}
    //   <p />
    //   {/* <div>Liveness Thumbnail</div>
    //   <img
    //     type="text"
    //     src={livenessThumbnail}
    //     //value={livenessThumbnail}
    //   /> */}

    //   <div>Liveness Thumbnail</div>
    //   <img    
    //     src= {livenessThumbnail} //{`${item.img}?w=248&fit=crop&auto=format`}
    //     //srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
    //     //alt={item.title}
    //     //loading="lazy"
    //   />

    //   {/* <label type="text">{livenessStatus}</label> */}
    // </div>
  );
}

export default App;
