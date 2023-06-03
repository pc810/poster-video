const _video: HTMLVideoElement = document.querySelector("video")!;
const _canvasContainer: HTMLDivElement =
  document.querySelector(".canvas-container")!;
const _canvas: HTMLCanvasElement = document.querySelector("canvas")!;
const _file: HTMLInputElement = document.querySelector("#file")!;
const _frameDecButton: HTMLButtonElement =
  document.querySelector("#dec-frame")!;
const _frameIncButton: HTMLButtonElement =
  document.querySelector("#inc-frame")!;
const _saveButton: HTMLButtonElement = document.querySelector("#save")!;
const _uiContainer: HTMLDivElement = document.querySelector("#meta-grid")!;
const _bgButtons: NodeListOf<HTMLButtonElement> =
  document.querySelectorAll("button[data-color]");

let _prevUploadedObjectUrl: string | null = null;

class VideoPoster {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  UI: HTMLDivElement;
  meta = {
    width: 0,
    height: 0,
  };
  constructor(
    video: HTMLVideoElement,
    canvas: HTMLCanvasElement,
    UI: HTMLDivElement
  ) {
    this.video = video;
    this.canvas = canvas;
    this.UI = UI;
    this.addEvents();
  }

  /**
   *
   * @param direction 1 represents number of  frame forward , -1 represents number of  frame backwards
   */
  moveByFrame(direction: number, frame: number = 1) {
    if (direction < 0)
      this.video.currentTime = Math.max(0, this.video.currentTime - frame / 25);
    else
      this.video.currentTime = Math.min(
        this.video.duration,
        this.video.currentTime + frame / 25
      );
  }
  playPauseVideo() {
    if (this.video.ended) this.video.currentTime = 0;
    else if (this.video.paused) this.video.play();
    else this.video.pause();
  }
  draw() {
    const context: CanvasRenderingContext2D | null =
      this.canvas.getContext("2d");

    if (context) {
      // Have to clear the previous frame for transparent background videos
      context.clearRect(0, 0, this.meta.width, this.meta.height);
      // Drawing Video on canvas
      context.drawImage(this.video, 0, 0, this.meta.width, this.meta.height);
    }
  }
  onLoad() {
    this.meta = {
      width: this.video.videoWidth,
      height: this.video.videoHeight,
    };
    this.video.width = this.meta.width;
    this.video.height = this.meta.height;

    this.canvas.width = this.meta.width;
    this.canvas.height = this.meta.height;
    const ticker = (_, meta) => {
      this.draw();
      this.drawUI(meta);
      this.video.requestVideoFrameCallback(ticker);
    };
    this.video.requestVideoFrameCallback(ticker);
  }

  drawUI(meta) {
    let htmlString = "";
    Object.entries(meta || {}).forEach(
      ([k, v]) =>
        (htmlString += `
      <div>
        <div class="text-base capitalize font-semibold">
          ${k}
        </div>
        <div class="text-sm">
          ${v}
        </div>
      </div>
    `)
    );
    this.UI.innerHTML = htmlString === "" ? "No data" : htmlString;
  }
  save() {
    const alink = document.createElement("a");
    alink.href = this.canvas.toDataURL("image/png");
    alink.download = "poster.png";
    alink.click();
  }
  addEvents() {
    this.video.addEventListener("play", () => this.draw());
    this.video.addEventListener("pause", () => this.draw());
  }
}

const app = new VideoPoster(_video, _canvas, _uiContainer);

_file.addEventListener("change", () => {
  if (_file.files?.length) {
    const file: File = _file.files[0];
    if (_video) {
      if (_prevUploadedObjectUrl) {
        URL.revokeObjectURL(_prevUploadedObjectUrl);
      }
      _prevUploadedObjectUrl = URL.createObjectURL(file);
      _video.src = _prevUploadedObjectUrl;
      _video.addEventListener("canplay", () => {
        app.onLoad();
      });
    }
  }
});

_frameDecButton.addEventListener("click", () => app.moveByFrame(-1));
_frameIncButton.addEventListener("click", () => app.moveByFrame(1));
_saveButton.addEventListener("click", () => app.save());
_bgButtons.forEach((b) => {
  b.addEventListener("click", () => {
    _canvasContainer.style.background = `${b.dataset.color}`;
  });
});
