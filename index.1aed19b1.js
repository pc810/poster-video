const _video=document.querySelector("video"),_canvas=document.querySelector("canvas"),_file=document.querySelector("#file"),_frameDecButton=document.querySelector("#dec-frame"),_frameIncButton=document.querySelector("#inc-frame"),_saveButton=document.querySelector("#save"),_uiContainer=document.querySelector("#meta-grid");let _prevUploadedObjectUrl=null;class VideoPoster{meta={width:0,height:0};constructor(e,t,i){this.video=e,this.canvas=t,this.UI=i,this.addEvents()}moveByFrame(e,t=1){this.video.currentTime=e<0?Math.max(0,this.video.currentTime-t/25):Math.min(this.video.duration,this.video.currentTime+t/25)}playPauseVideo(){this.video.ended?this.video.currentTime=0:this.video.paused?this.video.play():this.video.pause()}draw(){const e=this.canvas.getContext("2d");e&&(e.clearRect(0,0,this.meta.width,this.meta.height),e.drawImage(this.video,0,0,this.meta.width,this.meta.height))}onLoad(){this.meta={width:this.video.videoWidth,height:this.video.videoHeight},this.video.width=this.meta.width,this.video.height=this.meta.height,this.canvas.width=this.meta.width,this.canvas.height=this.meta.height;const e=(t,i)=>{this.draw(),this.drawUI(i),this.video.requestVideoFrameCallback(e)};this.video.requestVideoFrameCallback(e)}drawUI(e){let t="";Object.entries(e||{}).forEach((([e,i])=>t+=`\n      <div>\n        <div class="text-base capitalize font-semibold">\n          ${e}\n        </div>\n        <div class="text-sm">\n          ${i}\n        </div>\n      </div>\n    `)),this.UI.innerHTML=""===t?"No data":t}save(){const e=document.createElement("a");e.href=this.canvas.toDataURL("image/png"),e.download="poster.png",e.click()}addEvents(){this.video.addEventListener("play",(()=>this.draw())),this.video.addEventListener("pause",(()=>this.draw()))}}const app=new VideoPoster(_video,_canvas,_uiContainer);_file.addEventListener("change",(()=>{if(_file.files?.length){const e=_file.files[0];_video&&(_prevUploadedObjectUrl&&URL.revokeObjectURL(_prevUploadedObjectUrl),_prevUploadedObjectUrl=URL.createObjectURL(e),_video.src=_prevUploadedObjectUrl,_video.addEventListener("canplay",(()=>{app.onLoad()})))}})),_frameDecButton.addEventListener("click",(()=>app.moveByFrame(-1))),_frameIncButton.addEventListener("click",(()=>app.moveByFrame(1))),_saveButton.addEventListener("click",(()=>app.save()));
//# sourceMappingURL=index.1aed19b1.js.map
