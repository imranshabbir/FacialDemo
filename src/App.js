import React, { useState } from "react";
import './App.css';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Box, { BoxProps } from '@mui/material/Box';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { FilePond, File, registerPlugin } from 'react-filepond'
// Import FilePond styles
import 'filepond/dist/filepond.min.css'
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation'
import FilePondPluginImagePreview from 'filepond-plugin-image-preview'
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css'
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import { ConstructionOutlined, VolunteerActivismOutlined } from "@mui/icons-material";
//import { ContactSupportOutlined } from "@mui/icons-material";

import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

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
  const [url, setUrl] = useState("https://etisalatssms.server.aicenter.ae/")
  const [user, setUser] = useState("dev.etisalat@tdra.ae")
  const [password, setPassword] = useState("")

  const [livenessToken, setLivenessToken] = useState("")
  const [livenessConfig, setLivenessConfig] = useState("")

  const [livenessData, setLivenessData] = useState("")
  const [livenessDataHash, setLivenessDataHash] = useState("")
  const [livenessStatus, setLivenessStatus] = useState(false)
  const [livenessThumbnail, setLivenessThumbnail] = useState()
  const [livenessErrors, setLivenessErrors] = useState("")
    
  const [files, setFiles] = useState([]) 
  const [logs, setLogs] = useState('') 
  
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
         DocumentIssueDate :"2012-04-15",
         expiryDate :"2031-10-13",
         primaryIdentifier :"GEORGE",
         secondaryIdentifier :"FEDERICK",
         birthDate :"1974-08-12",
         gender :"M",
         DocumentNationality :"ARE",
         mrz :{            
               line1 :"P<AREABDULLAH<<AHMAD<MOHAMAD<<<<<<<<<<<<<<<<",
               line2 :"L898902C36ARE7408122F1204159ZE184226B<<<<<10",
               line3 :"ABDULLAH<<AHMAD<MOHAMAD<<<<<<<"
            },
        dataPageScan : "",
        secondPageScan :"",
        nfcPortrait :"",
        nfcSignature :"",
        CroppedPortrait :"",
      } ,    
    ],
    face:[
        {
          Data: "",
          DataHash: "",
          Tag: null
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
        console.log(
          window && window.EfrSDK.getInstance.getVersion(),
          window && window.EfrSDK.getInstance.getExpiryDate()
        );
        console.log("===================");
        setLogs(logs => logs + 'SDK initialization success\n')  
      },
      on_error: function (error) {
        setLogs(logs => logs + 'SDK Initialization failure '+ error.message + '\n')  
        setLivenessErrors(error.code + " - " + error.message)
        console.log(error);
      },
    });
  }




  const rhservrLogin = async () => {
    try {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var raw = JSON.stringify({
        email: user,
        password: password,
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };
      let result = await fetch(
        url + "auth/access/login",
        requestOptions
      );
      
      if (result.status === 200) {
        result.json().then((data) => {
          if (data.succeeded == true) {
            //rhservAuthToken = data.data.token;
            setLogs(logs => logs + 'Successful Login\n')            
            setLivenessToken(data.data.token)
            getPureliveConfig(data.data.token);
          } else {
            //alert("RHServ Api : " + data.errors[0]);
            setLogs(logs => logs + 'Failure while login ' + data.errors[0] + '\n')
          }
        });
      } else {
        result.json().then((data) => {
          //alert("RHServ Api : " + data.errors[0].message);          
          setLogs(logs => logs + 'Failure while login ' + data.errors[0].message + '\n')
        });
      }
    } catch (err) {
      setLogs(logs => logs + 'Failure while login ' + err + '\n')
      console.error(err);
    }
  };

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
        url + "sdk/configuration",
        requestOptions
      );
      
      if (result.status === 200) {
        await result.json().then((resultConfig) => {
          if (resultConfig) {
            config = resultConfig.data;
            setLogs(logs => logs + 'Success in getting config\n')
            
            setLivenessConfig(resultConfig.data)
            setSecretKey(token);
          }
        });
      }
    } catch (err) {
      setLogs(logs => logs + 'Failure getting config ' + err + '\n')
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
        url + "rhapi/Mgmt/GetTemporaryKey",
        requestOptions
      );

      if (result.status === 200) {
        await result.json().then((secretKey) => {
          
          setLogs(logs => logs + 'Success in getting secret key\n')
          initializeSDK(config, secretKey);
        });
      }
    } catch (err) {
      setLogs(logs => logs + 'Failure getting secret key ' + err + '\n')
      console.error(err);
    }
  };

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
    let response = await fetch(url + "sdk/liveness", requestOptions);
    
    if (response.ok && response.status == 200) {
      let resposeJson = await response.json();
      window.EfrSDK.getInstance.executeFeedback({
        data: resposeJson.data,
        on_result: function (result) {
          resultCallback(result);          
        },
      });
    }
  };

  function resultCallback(finalResult) {
    if (finalResult.status == false) {
      setLogs(logs => logs + finalResult.errors[0].message + '\n')
      setLivenessErrors(finalResult.errors[0].code + " - " + finalResult.errors[0].message)
      return;
    }

    if (finalResult.status === true && finalResult.data !== "") {      
      setLogs(logs => logs + 'Liveness check successful\n')
      setLivenessData(finalResult.data)
      setLivenessStatus(finalResult.status)
      setLivenessDataHash(finalResult.datahash)
      setLivenessThumbnail(finalResult.thumbnail)

      // console.log("---------image base64----------")
      // console.log(finalResult.thumbnail.split(',')[1])
      // console.log("---------end image base64----------")
    }
  }




  function startProcess() {
    window && window.EfrSDK.getInstance.startProcess({
      on_progress: function () {
        document.getElementById("loader").style.display = "block";
        setLogs(logs => logs + 'Liveness check in progress\n')
      },
      on_feedback: function (result) {
        feedBackHandler(result);
      },
      on_error: function (error) {
        document.getElementById("loader").style.display = "none";
        console.log(error);
        setLogs(logs => logs + 'Liveness error ' + error + '\n')
      },
      on_close: function () {
        console.log("on_close========");
        setLogs(logs => logs + 'Liveness closed\n')
      },
      on_timeout: function () {        
        console.log("on_timeout========");
        setLogs(logs => logs + 'Liveness check timed out\n')
      },
    });
  }

  const handleLivenessCheck = () => {
    setLivenessStatus('')
    setLivenessData('')
    setLivenessDataHash('')
    setLivenessErrors('')
    setLivenessThumbnail('')

    startProcess();
  }

  const sendPassportData = async () => {
    console.log("---------start sendPassportData----------")
    setLogs(logs => logs + 'Onboarding (passport) in progress\n')
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + livenessToken);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(passportData),
      redirect: "follow",
    };

    console.log("requestOptions")
    console.log(requestOptions)
    let response = await fetch(url + "api/v1/Subscriber/FaceOnboarding", requestOptions);

    
    if (response.status === 200) {
      //console.log(response)
      response.json().then((data) => {        
        setLogs(logs => logs + 'Onboarding (passport) successful\n')
        console.log(data)
        console.log(data.subscriberId)
        console.log(data.intermediaryTransactionId)
        setSubscriptionData({ ...subscriptionData , subscriberId : data.subscriberId, intermediaryTransactionId: data.intermediaryTransactionId })
        //setSubscriptionData({ ...serviceData , subscriberId : data.subscriberId, intermediaryTransactionId: data.intermediaryTransactionId })
        setServiceData({ ...serviceData ,  
          intermediaryTransactionId : data.intermediaryTransactionId,
          subscriptionServices:  
            [...serviceData.subscriptionServices].map(obj =>{
                return {
                  ...obj,
                  subscriptionNumber : data.subscriberId, 
                }
            })      
        })        
      })
    }
    else
    {
      // response.json().then((data) => {
      //   //alert("Send Passport Data Api : " + data.errors[0].message);
      //   setLogs(logs => logs + 'Onboarding (passport error) - ' + data.errors[0].message + '\n')
      // });

      setLogs(logs => logs + 'Onboarding (passport) failure - ' + response.status + " " + response.statusText + '\n')
      
      console.log(response)
    }
    console.log("---------end sendPassportData----------")
  };

  const sendSubscriptionData = async () => {
    console.log("-----------start sendSubscriptionData------------")
    console.log(passportData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + livenessToken);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(subscriptionData),
      redirect: "follow",
    };

    console.log(requestOptions)

    let response = await fetch(url + "api/v1/Subscription/Add", requestOptions);

    console.log(response)
    if (response.status === 200) {
      setLogs(logs => logs + 'Add subscription successful\n')
      response.json().then((data) => {
        //console.log(data)
      })
    }
    else
    {
      console.log(response)
      setLogs(logs => logs + 'Add subscription failure - ' + response.status + " " + response.statusText + '\n')
      // response.json().then((data) => {
      //   console.log("Send Subscription Data Api : " + data.errors[0].message);
      //   //setLogs(logs => logs + 'Add subscription failure - ' + data.statusText + '\n')
      // });
    }
    console.log("-----------end sendSubscriptionData------------")
  };

  const sendServicesData = async () => {
    console.log("----------start sendServicesData-------------")
    console.log(passportData)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "Bearer " + livenessToken);
    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(serviceData),
      redirect: "follow",
    };

    console.log(requestOptions)
    let response = await fetch(url + "api/v1/Subscription/AssignServices", requestOptions);

    console.log(response)
    if (response.status === 200) {
      setLogs(logs => logs + 'Assign service successful\n')
      response.json().then((data) => {
        //console.log(data)
      })
    }
    else
    {
      console.log(response)
      setLogs(logs => logs + 'Assign service failure - ' + response.status + " " + response.statusText + '\n')
      // response.json().then((data) => {
      //   ConstructionOutlined.log("Send Send Services Api : " + data.errors[0].message);
      //   setLogs(logs => logs + 'Assign service failure - ' + data.errors[0].message + '\n')
      // });
    }
    console.log("----------end sendServicesData-------------")
  };


  // React.useEffect(()=>{
  //   rhservrLogin();
  // },[]) 

  React.useEffect(()=>{
    setPassportData({ ...passportData ,  
      subscriberDocuments:  
        [...passportData.subscriberDocuments].map(obj =>{
            return {
              ...obj,
              nfcPortrait : livenessThumbnail?.split(',')[1],
              CroppedPortrait : livenessThumbnail?.split(',')[1],
            }
        }),  
        face:  
          [...passportData.face].map(obj =>{
              return {
                ...obj,
                DataHash : livenessDataHash,
                Data : livenessData,
              }
          })
    })

  },[livenessData, livenessDataHash, livenessThumbnail])

  React.useEffect(()=>{
    console.log(files[0]?.getFileEncodeBase64String())
    setPassportData({ ...passportData ,  
      subscriberDocuments:  
        [...passportData.subscriberDocuments].map(obj =>{
            return {
              ...obj,
              dataPageScan : files[0]?.getFileEncodeBase64String()  ,
              secondPageScan : files[0]?.getFileEncodeBase64String()  
            }
        })      
    })    

    //console.log(files. getFileEncodeBase64String())
  },[files])

  React.useEffect(()=>{
    console.log(JSON.stringify(passportData))
  },[passportData])

  React.useEffect(()=>{
    console.log(JSON.stringify(subscriptionData))
  },[subscriptionData])

  React.useEffect(()=>{
    console.log(JSON.stringify(serviceData))
  },[serviceData])

  // var defaultFile = [
  //   {
  //     source: file,
  //     options: {
  //       type: "input",
  //       file: {
  //         name: "Image_created_with_a_mobile_phone.png",
  //         type: "image/png"
  //       }
  //     }
  //   }
  // ];

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <Grid container>      
        <Grid xs={8}>
          <div className="loader" id="loader"></div>
          <div id="image-crop-container"></div>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="Login" value="1" />
                <Tab label="Check Liveness" value="2" />
                <Tab label="Onboarding (Passport)" value="3" />
                <Tab label="Add Subscription" value="4" />
                <Tab label="Add Services" value="5" />
              </TabList>
            </Box>
            <TabPanel value="1">
                <Stack direction="row" spacing={2}>
                  <TextField disabled label="User" defaultValue={user} style={{width:'100%'}} InputLabelProps={{ shrink: true }} 
                  onChange = { e => setUser(e.target.value) }   />
                  <TextField label="Password" defaultValue={password} style={{width:'100%'}} InputLabelProps={{ shrink: true }} 
                  onChange = { e => setPassword(e.target.value) } />
                </Stack>
                <p />
                <Stack direction="row" spacing={2}>
                  <TextField disabled label="URL" defaultValue={url} style={{width:'100%'}} InputLabelProps={{ shrink: true }} onChange = { e => setUrl(e.target.value) }/>
                  <LoadingButton
                    style={{backgroundColor:'#e10000'}}
                    //style={{backgroundColor:'#ff0000'}}
                    onClick={rhservrLogin}
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    variant="contained"          
                  >
                    Login
                  </LoadingButton>
                </Stack>
            </TabPanel>
            
            
            <TabPanel value="2">
              <center><img src={livenessThumbnail} /></center>
              <p />
              <center><div style={{color:'black'}}>Liveness Status : { livenessStatus === true ? 'Passed' : 'To be passed'  }</div></center>
              <p />
              <TextField disabled label="Liveness Data Hash" defaultValue={livenessDataHash} style={{width:'100%'}} multiline rows="1" />
              <p />
              <TextField disabled label="Liveness Data" defaultValue={livenessData} style={{width:'100%'}}  multiline rows="6" InputLabelProps={{ shrink: true }} />
              <p />
              <center>
              <LoadingButton
                style={{backgroundColor:'#e10000'}}
                //style={{backgroundColor:'#ff0000'}}
                onClick={handleLivenessCheck}
                endIcon={<SendIcon />}
                loadingPosition="end"
                variant="contained"          
              >
                Check Liveness
              </LoadingButton>
              </center>
            </TabPanel>
            
            
            <TabPanel value="3">
            <Grid>
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
                  loadingPosition="end"
                  variant="contained"          
                >
                  Send Passport Data
                </LoadingButton>
              </Item>      
            </Grid>
            </TabPanel>


            <TabPanel value="4">
              <Grid>
                <Item style={{width:'100%'}}>
                    <TextField  disabled label="Subscriber Id" value={subscriptionData.subscriberId} style={{width:'100%'}} 
                      //onChange = { e => setSubscriptionData({ ...subscriptionData , subscriberId : e.target.value}) }                
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                    <TextField disabled label="Intermediary Transaction Id" value={subscriptionData.intermediaryTransactionId} style={{width:'100%'}} 
                      //onChange = { e => setSubscriptionData({ ...subscriptionData , intermediaryTransactionId : e.target.value}) }                
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                    <TextField label="Phone Number" defaultValue={subscriptionData.subscriptions[0].phoneNumber} style={{width:'100%'}} 
                      onChange = { e => { 
                        setSubscriptionData({ ...subscriptionData ,  
                          subscriptions:  
                            [...subscriptionData.subscriptions].map(obj =>{
                                return {
                                  ...obj,
                                  phoneNumber : e.target.value,
                                }
                            })      
                        })                    
                      } }     
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                    <TextField label="Line Type" defaultValue={subscriptionData.subscriptions[0].lineType} style={{width:'100%'}} 
                      onChange = { e => { 
                        setSubscriptionData({ ...subscriptionData ,  
                          subscriptions:  
                            [...subscriptionData.subscriptions].map(obj =>{
                                return {
                                  ...obj,
                                  lineType : e.target.value,
                                }
                            })      
                        })                    
                      } }     
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                    <TextField label="Service Type" defaultValue={subscriptionData.subscriptions[0].serviceType} style={{width:'100%'}} 
                      onChange = { e => { 
                        setSubscriptionData({ ...subscriptionData ,  
                          subscriptions:  
                            [...subscriptionData.subscriptions].map(obj =>{
                                return {
                                  ...obj,
                                  serviceType : e.target.value,
                                }
                            })      
                        })                    
                      } }     
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                    <TextField label="Channel Type" defaultValue={subscriptionData.subscriptions[0].channelType} style={{width:'100%'}} 
                      onChange = { e => { 
                        setSubscriptionData({ ...subscriptionData ,  
                          subscriptions:  
                            [...subscriptionData.subscriptions].map(obj =>{
                                return {
                                  ...obj,
                                  channelType : e.target.value,
                                }
                            })      
                        })                    
                      } }     
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                    <TextField label="Address" defaultValue={subscriptionData.subscriptions[0].address} style={{width:'100%'}} 
                      onChange = { e => { 
                        setSubscriptionData({ ...subscriptionData ,  
                          subscriptions:  
                            [...subscriptionData.subscriptions].map(obj =>{
                                return {
                                  ...obj,
                                  address : e.target.value,
                                }
                            })      
                        })                    
                      } }     
                    />
                </Item> 
                <Item style={{width:'100%'}}>
                  <LoadingButton
                      style={{backgroundColor:'#e10000'}}
                      //style={{backgroundColor:'#ff0000'}}
                      onClick={ sendSubscriptionData }
                      endIcon={<SendIcon />}
                      //disabled = { livenessData == "" ? true : false }
                      loadingPosition="end"
                      variant="contained"          
                    >
                      Add Subscription
                  </LoadingButton>
                </Item>      
              </Grid>
            </TabPanel>


            <TabPanel value="5">
              <Grid>
              <Item style={{width:'100%'}}>
                  <TextField label="Services" value={serviceData.subscriptionServices[0].services} style={{width:'100%'}} 
                      onChange = { e => { 
                        setServiceData({ ...serviceData ,  
                          intermediaryTransactionId : subscriptionData.intermediaryTransactionId,
                          subscriptionServices:  
                            [...serviceData.subscriptionServices].map(obj =>{
                                return {
                                  ...obj,
                                  subscriptionNumber : subscriptionData.subscriberId,
                                  services : [e.target.value],
                                }
                            })      
                        })                    
                      } }     
                    />
                </Item>
                <Item style={{width:'100%'}}>
                  <LoadingButton
                      style={{backgroundColor:'#e10000'}}
                      //style={{backgroundColor:'#ff0000'}}
                      onClick={ sendServicesData }
                      endIcon={<SendIcon />}
                      //disabled = { livenessData == "" ? true : false }
                      loadingPosition="end"
                      variant="contained"          
                    >
                      Assign Services
                  </LoadingButton>
                </Item>      
              </Grid>
            </TabPanel>
          </TabContext>
        </Grid>

        <Grid Item xs={3.9}>
          <center style={{marginTop:57}}> LOG </center>
          <TextField label="Logs" value={logs} style={{width:'100%'}} multiline rows={25} />
        </Grid>
      </Grid>
    </Box>  
    // <Box sx={{ width: '100%', margin:'3%'}}>
    //   <div className="loader" id="loader"></div>
    //   <div id="image-crop-container"></div>
    //   <p />
    //   <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
    //     <Grid Item xs={11}>          
    //       <Item style={{width:'100%'}}>            
    //         <Stack direction="row" spacing={2}>
    //           <TextField disabled label="User" defaultValue={user} style={{width:'100%'}} InputLabelProps={{ shrink: true }} 
    //           onChange = { e => setUser(e.target.value) }   />
    //           <TextField label="Password" defaultValue={password} style={{width:'100%'}} InputLabelProps={{ shrink: true }} 
    //           onChange = { e => setPassword(e.target.value) } />
    //         </Stack>
    //       </Item>
    //       <Item style={{width:'100%'}}>            
    //         <Stack direction="row" spacing={2}>
    //           <TextField disabled label="URL" defaultValue={url} style={{width:'100%'}} InputLabelProps={{ shrink: true }} 
    //             onChange = { e => setUrl(e.target.value) }
    //           />
    //           <LoadingButton
    //           style={{backgroundColor:'#e10000'}}
    //           //style={{backgroundColor:'#ff0000'}}
    //           onClick={rhservrLogin}
    //           endIcon={<SendIcon />}
    //           loadingPosition="end"
    //           variant="contained"          
    //           >
    //             Login
    //           </LoadingButton>
    //         </Stack>
    //       </Item>
    //     </Grid>
    //     <Grid Item xs={5}>          
    //       <Item>          
    //         <LoadingButton
    //           style={{backgroundColor:'#e10000'}}
    //           //style={{backgroundColor:'#ff0000'}}
    //           onClick={handleLivenessCheck}
    //           endIcon={<SendIcon />}
    //           loadingPosition="end"
    //           variant="contained"          
    //         >
    //           Check Liveness
    //         </LoadingButton>
    //       </Item>          
    //       <Item>
    //         <div style={{color:'red'}}>{livenessErrors}</div>            
    //         <img src={livenessThumbnail} />           
    //         <div style={{color:'black'}}>{String(livenessStatus)}</div>
    //       </Item>
    //       <Item>
    //         <Stack direction="row" spacing={2}>
    //           <TextField disabled label="Liveness Data Hash" defaultValue={livenessDataHash} style={{width:'100%'}} multiline rows="2" />
    //         </Stack>
    //       </Item>
    //       <Item>
    //         <TextField disabled label="Liveness Data" defaultValue={livenessData} style={{width:'100%'}}  multiline rows="6" InputLabelProps={{ shrink: true }} />
    //       </Item>
    //     </Grid>    
    //     <Grid xs={6}>
    //       <Item style={{width:'100%'}}>            
    //         <Stack direction="row" spacing={2}>
    //           <TextField label="Email" defaultValue={"one@Test.com"} style={{width:'100%'}} 
    //           onChange = { e => setPassportData({ ...passportData , emailAddress : e.target.value}) }   
    //           />
    //           <TextField label="Subscriber Id" defaultValue={""} style={{width:'100%'}} 
    //           onChange = { e => setPassportData({ ...passportData , subscriberId : e.target.value}) }   
    //           />
    //         </Stack>            
    //       </Item>
    //       <Item style={{width:'100%'}}>            
    //         <Stack direction="row" spacing={2}>
    //           <TextField label="Document Code" defaultValue={"P<"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       documentCode : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }     
    //           />
    //           <TextField label="Issuing Authority" defaultValue={"ARE"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       issuingAuthority : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <TextField label="Document Number" defaultValue={"P123456"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       documentNumber : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />  
    //           <TextField label="Registrant Number" defaultValue={""}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       registrantNumber : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //         </Stack>            
    //       </Item>
    //       <Item style={{width:'100%'}}>
    //         <Stack direction="row" spacing={2}>              
    //           <TextField label="Document Issue Date" defaultValue={"2012-04-15"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       documentIssueDate : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <TextField label="Expiry Date" defaultValue={"2031-10-13"}  
    //            onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       expiryDate : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <TextField label="Primary Identifier" defaultValue={"GEORGE"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       primaryIdentifier : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <TextField label="Secondary Identifier" defaultValue={"FEDERICK"} 
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       secondaryIdentifier : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //         </Stack>       
    //       </Item>
    //       <Item style={{width:'100%'}}>
    //         <Stack direction="row" spacing={2}>              
    //           <TextField label="Birth Date" defaultValue={"1974-08-12"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       birthDate : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <TextField label="Gender" defaultValue={"M"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       gender : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <TextField label="Document Nationality" defaultValue={"ARE"}  
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       documentNationality : e.target.value,
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //           <div style={{width:"25%"}} />
    //         </Stack>       
    //       </Item>
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Line 1" defaultValue={"P<AREABDULLAH<<AHMAD<MOHAMAD<<<<<<<<<<<<<<<<"} style={{width:'100%'}} 
    //            onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       mrz : { ...obj.mrz, line1 : e.target.value }
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Line 2" defaultValue={"L898902C36ARE7408122F1204159ZE184226B<<<<<10"} style={{width:'100%'}} 
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       mrz : { ...obj.mrz, line2 : e.target.value }
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Line 3" defaultValue={"ABDULLAH<<AHMAD<MOHAMAD<<<<<<<"} style={{width:'100%'}} 
    //           onChange = { e => { 
    //             setPassportData({ ...passportData ,  
    //               subscriberDocuments:  
    //                 [...passportData.subscriberDocuments].map(obj =>{
    //                     return {
    //                       ...obj,
    //                       mrz : { ...obj.mrz, line3 : e.target.value }
    //                     }
    //                 })      
    //             })                    
    //            } }    
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //         <FilePond
    //           files={files}
    //           onupdatefiles={setFiles}
    //           //allowMultiple={true}
    //           maxFiles={1}
    //           //server="/api"
    //           name="files"  // sets the file input name, it's filepond by default 
    //           labelIdle='Upload Passport Image'
    //           allowFileEncode={true}
    //         />

    //       <LoadingButton
    //           style={{backgroundColor:'#e10000'}}
    //           //style={{backgroundColor:'#ff0000'}}
    //           onClick={ sendPassportData }
    //           endIcon={<SendIcon />}
    //           disabled = { livenessData == "" ? true : false }
    //           loadingPosition="end"
    //           variant="contained"          
    //         >
    //           Send Passport Data
    //         </LoadingButton>
    //       </Item>      
    //     </Grid>
    //     <Grid xs={5}>
    //       <Item style={{width:'100%'}}>
    //           <TextField  disabled label="Subscriber Id" value={subscriptionData.subscriberId} style={{width:'100%'}} 
    //             //onChange = { e => setSubscriptionData({ ...subscriptionData , subscriberId : e.target.value}) }                
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField disabled label="Intermediary Transaction Id" value={subscriptionData.intermediaryTransactionId} style={{width:'100%'}} 
    //             //onChange = { e => setSubscriptionData({ ...subscriptionData , intermediaryTransactionId : e.target.value}) }                
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Phone Number" defaultValue={subscriptionData.subscriptions[0].phoneNumber} style={{width:'100%'}} 
    //             onChange = { e => { 
    //               setSubscriptionData({ ...subscriptionData ,  
    //                 subscriptions:  
    //                   [...subscriptionData.subscriptions].map(obj =>{
    //                       return {
    //                         ...obj,
    //                         phoneNumber : e.target.value,
    //                       }
    //                   })      
    //               })                    
    //              } }     
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Line Type" defaultValue={subscriptionData.subscriptions[0].lineType} style={{width:'100%'}} 
    //             onChange = { e => { 
    //               setSubscriptionData({ ...subscriptionData ,  
    //                 subscriptions:  
    //                   [...subscriptionData.subscriptions].map(obj =>{
    //                       return {
    //                         ...obj,
    //                         lineType : e.target.value,
    //                       }
    //                   })      
    //               })                    
    //              } }     
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Service Type" defaultValue={subscriptionData.subscriptions[0].serviceType} style={{width:'100%'}} 
    //             onChange = { e => { 
    //               setSubscriptionData({ ...subscriptionData ,  
    //                 subscriptions:  
    //                   [...subscriptionData.subscriptions].map(obj =>{
    //                       return {
    //                         ...obj,
    //                         serviceType : e.target.value,
    //                       }
    //                   })      
    //               })                    
    //              } }     
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Channel Type" defaultValue={subscriptionData.subscriptions[0].channelType} style={{width:'100%'}} 
    //             onChange = { e => { 
    //               setSubscriptionData({ ...subscriptionData ,  
    //                 subscriptions:  
    //                   [...subscriptionData.subscriptions].map(obj =>{
    //                       return {
    //                         ...obj,
    //                         channelType : e.target.value,
    //                       }
    //                   })      
    //               })                    
    //              } }     
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Address" defaultValue={subscriptionData.subscriptions[0].address} style={{width:'100%'}} 
    //             onChange = { e => { 
    //               setSubscriptionData({ ...subscriptionData ,  
    //                 subscriptions:  
    //                   [...subscriptionData.subscriptions].map(obj =>{
    //                       return {
    //                         ...obj,
    //                         address : e.target.value,
    //                       }
    //                   })      
    //               })                    
    //              } }     
    //           />
    //       </Item> 
    //       <Item style={{width:'100%'}}>
    //         <LoadingButton
    //             style={{backgroundColor:'#e10000'}}
    //             //style={{backgroundColor:'#ff0000'}}
    //             onClick={ sendSubscriptionData }
    //             endIcon={<SendIcon />}
    //             //disabled = { livenessData == "" ? true : false }
    //             loadingPosition="end"
    //             variant="contained"          
    //           >
    //             Add Subscription
    //         </LoadingButton>
    //       </Item>      
    //     </Grid>
    //     <Grid xs={6}>
    //       <Item style={{width:'100%'}}>
    //           <TextField label="Services" value={serviceData.subscriptionServices[0].services} style={{width:'100%'}} 
    //             onChange = { e => { 
    //               setServiceData({ ...serviceData ,  
    //                 intermediaryTransactionId : subscriptionData.intermediaryTransactionId,
    //                 subscriptionServices:  
    //                   [...serviceData.subscriptionServices].map(obj =>{
    //                       return {
    //                         ...obj,
    //                         subscriptionNumber : subscriptionData.subscriberId,
    //                         services : [e.target.value],
    //                       }
    //                   })      
    //               })                    
    //              } }     
    //           />
    //       </Item>
    //       <Item style={{width:'100%'}}>
    //         <LoadingButton
    //             style={{backgroundColor:'#e10000'}}
    //             //style={{backgroundColor:'#ff0000'}}
    //             onClick={ sendServicesData }
    //             endIcon={<SendIcon />}
    //             //disabled = { livenessData == "" ? true : false }
    //             loadingPosition="end"
    //             variant="contained"          
    //           >
    //             Assign Services
    //         </LoadingButton>
    //       </Item>      
    //     </Grid>
    //   </Grid>
    //  </Box> 
  );
}

export default App;
