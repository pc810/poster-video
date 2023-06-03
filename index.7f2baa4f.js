const e=document.querySelector("video"),t=document.querySelector(".canvas-container"),i=document.querySelector("canvas"),a=document.querySelector("#file"),d=document.querySelector("#dec-frame"),s=document.querySelector("#inc-frame"),h=document.querySelector("#save"),o=document.querySelector("#meta-grid"),r=document.querySelectorAll("button[data-color]");let c=null;const n=new class{constructor(e,t,i){this.meta={width:0,height:0},this.video=e,this.canvas=t,this.UI=i,this.addEvents()}moveByFrame(e,t=1){e<0?this.video.currentTime=Math.max(0,this.video.currentTime-t/25):this.video.currentTime=Math.min(this.video.duration,this.video.currentTime+t/25)}playPauseVideo(){this.video.ended?this.video.currentTime=0:this.video.paused?this.video.play():this.video.pause()}draw(){let e=this.canvas.getContext("2d");e&&(e.clearRect(0,0,this.meta.width,this.meta.height),e.drawImage(this.video,0,0,this.meta.width,this.meta.height))}onLoad(){this.meta={width:this.video.videoWidth,height:this.video.videoHeight},this.video.width=this.meta.width,this.video.height=this.meta.height,this.canvas.width=this.meta.width,this.canvas.height=this.meta.height;let e=(t,i)=>{this.draw(),this.drawUI(i),this.video.requestVideoFrameCallback(e)};this.video.requestVideoFrameCallback(e)}drawUI(e){let t="";Object.entries(e||{}).forEach(([e,i])=>t+=`
      <div>
        <div class="text-base capitalize font-semibold">
          ${e}
        </div>
        <div class="text-sm">
          ${i}
        </div>
      </div>
    `),this.UI.innerHTML=""===t?"No data":t}save(){let e=document.createElement("a");e.href=this.canvas.toDataURL("image/png"),e.download="poster.png",e.click()}addEvents(){this.video.addEventListener("play",()=>this.draw()),this.video.addEventListener("pause",()=>this.draw())}}(e,i,o);a.addEventListener("change",()=>{if(a.files?.length){let t=a.files[0];e&&(c&&URL.revokeObjectURL(c),c=URL.createObjectURL(t),e.src=c,e.addEventListener("canplay",()=>{n.onLoad()}))}}),d.addEventListener("click",()=>n.moveByFrame(-1)),s.addEventListener("click",()=>n.moveByFrame(1)),h.addEventListener("click",()=>n.save()),r.forEach(e=>{e.addEventListener("click",()=>{t.style.background=`${e.dataset.color}`})});
//# sourceMappingURL=index.7f2baa4f.js.map
