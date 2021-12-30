import moment from 'moment';
import renderEmoji from './utils/renderEmoji';
import abbrev from './utils/abbrev';

interface GetLinesParams {
text: string,
ctx: CanvasRenderingContext2D,
maxWidth: number
}
class Util {

    constructor() {
        throw new Error(`The ${this.constructor.name} class may not be instantiated!`);
    }
   
    static validateHex(hex: string): boolean { 
        return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(hex);
    }

    static discordTime(time?: Date) {
        let date = time && time  instanceof Date ? time : new Date();
        let hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
        return `Today at ${hours}:${minutes}`;
    }
    
    static formatTime(time: number) {
        if (!time) return "00:00";
        const fmt = moment.duration(time).toISOString();

        const chunk = fmt.split(":");
        if (chunk.length < 2) chunk.unshift("00");
        return chunk.join(":");
    }

    static shorten(text: string, len: number) {
        if (text.length <= len) return text;
        return text.substr(0, len).trim() + "...";
    }

    static toAbbrev<T = string | number>(num: T): T {
        return abbrev(num);
    }

    static renderEmoji(ctx: CanvasRenderingContext2D, msg: string, x: number, y: number) {
        return renderEmoji(ctx, msg, x, y);
    }

    static formatHex(hex: string, alt = "#000000") {
        hex = hex.replace("#", "");
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length !== 6) return alt || "#000000";

        return `#${hex}`;
    }

    static invertColor(hex: string) {
        hex = hex.replace("#", "");

        // match hex color
        if (hex.length === 3) hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        if (hex.length !== 6) return "#FFFFFF";

        // invert colors
        const r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16);
        const g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16);
        const b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);

        // return new hex
        const pad = (txt: string, length?: number) => {
            length = length || 2;
            let arr = [length].join("0");
            return (arr + txt).slice(-length);
        };

        const finalHex = `#${pad(r)}${pad(g)}${pad(b)}`;
        return finalHex;
    }

    static getAcronym(name: string) {
        return name
            .replace(/'s /g, " ")
            .replace(/\w+/g, e => e[0])
            .replace(/\s/g, "");
    }
    
    
    static getLines({text, ctx, maxWidth}: GetLinesParams): string[] {
        const lines = [];

        while (text.length) {
            let i;
            for (i = text.length; ctx.measureText(text.substr(0, i)).width > maxWidth; i -= 1);
            const result = text.substr(0, i);
            let j;
            if (i !== text.length) for (j = 0; result.indexOf(" ", j) !== -1; j = result.indexOf(" ", j) + 1);
            lines.push(result.substr(0, j || result.length));
            text = text.substr(lines[lines.length - 1].length, text.length);
        }

        return lines;
    }

}