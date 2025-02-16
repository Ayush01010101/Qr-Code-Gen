const upload=document.querySelector('.upload-qr')
const scan_button = document.querySelector('.start-scanning');
const flash=document.querySelector(".flash")
const video=document.getElementById("video")
const flip=document.querySelector('.flip')
const Light=document.querySelector(".Light")
const Dark=document.querySelector(".Dark")
const container=document.querySelector(".container")
const Generate_qr=document.querySelector(".Generate-QR")
const Generate=document.querySelector(".Generate")
const second_container=document.querySelector(".container2")
const input=document.querySelector('.input')
const image=document.getElementsByClassName('image')[0]
const Scan=document.querySelector(".Scan")


//genrate qr code

let input_value;

input.addEventListener("input",(e)=>{
  input_value=e.target.value
})





//theme mode

if(window.matchMedia('prefers-color-scheme: dark')){
  
  const body=document.getElementsByTagName('body')[0]
  body.setAttribute('class','dark-mode')
  Dark.style='display:none'
  Light.style='display:block'
}
else{

  const body=document.getElementsByTagName('body')[0]
  body.setAttribute('class','light-mode')
  Light.style='display:none'
  Dark.style='display:block'
}

let front_camera=false;

const qrScanner = new QrScanner(
  video,
  (result)=>{
    navigator.vibrate(200)
    open(result.data)
    return true;
    
  },
  {}, 
);


function scan(){
  
  

  try {
    qrScanner.start()
  } catch (error) {
    alert('failed to scan qr code')
  }
}

// qrScanner.setInversionMode("inversionMode");


upload.addEventListener("click",()=>{
  const input=document.createElement("input")
  input.type='file'
  input.setAttribute("accept",'image/*')
  input.click()

  input.addEventListener('change',(e)=>{
    QrScanner.scanImage(e.target?.files[0])
    .then((result)=>{
      navigator.vibrate(200)
      open(result,'_blank')
    })
    .catch(()=>{  
      alert('qr code failed to scanned')
    })
  })
})


scan_button.addEventListener('click',()=>{  
  scan()
})



//toogle flash
flash.addEventListener('click',()=>{
  qrScanner.toggleFlash();
})


flip.addEventListener('click',()=>{
 if(!front_camera){
   qrScanner.setCamera("facingModeOrDeviceId")
   front_camera=true;
 }
 else{
  qrScanner.setCamera('environment')
  front_camera=false;
 }
  
})


Light.addEventListener('click',()=>{
  const body=document.getElementsByTagName('body')[0]
  body.setAttribute('class','light-mode')
  Light.style='display:none'
  Dark.style='display:block'
})

Dark.addEventListener('click',()=>{
  const body=document.getElementsByTagName('body')[0]
  body.setAttribute('class','dark-mode')
  Dark.style='display:none'
  Light.style='display:block'
})

Generate_qr.addEventListener("click",()=>{
  container.style='display:none'
  second_container.style='display:flex'
})


Generate.addEventListener("click",()=>{
  image.innerHTML=''
  const qr=new QRCode(image, input_value);
  
})


Scan.addEventListener("click",()=>{
  second_container.style='display:none'
  container.style='display:flex'
})