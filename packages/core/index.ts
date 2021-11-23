import { Canvas, createCanvas, loadImage } from "canvas";
import { CanvasInitOptions } from "./types/types";

export default class CanvacordCore {
    public options: CanvasInitOptions;
    public canvas: Canvas;
    public ctx: CanvasRenderingContext2D;
    constructor(options: CanvasInitOptions) {
        this.options = options;

        this.canvas = this.createCanvas();

        this.ctx = this.getContext();
    }

    public createCanvas() {
        return createCanvas(this.options.width, this.options.height);
    }

    public getCanvas() {
        return this.canvas;
    }

    public getContext() {
        return this.canvas.getContext("2d");
    }

    public getImage() {
        return this.canvas.toBuffer();
    }

    public async loadImage<T>(url: T) {
        return loadImage(url);
    }

    public async build() {
        return this.canvas.toBuffer();
    }

    public async buildBase64() {
        return this.canvas.toDataURL();
    }
}