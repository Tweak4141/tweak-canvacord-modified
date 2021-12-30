import emoji from '@canvacord/emoji-parser';

const renderEmoji = async (ctx: CanvasRenderingContext2D, msg: string, x: number, y: number) => {
    return await emoji.fillTextWithTwemoji(ctx, msg, x, y);
}

export default renderEmoji;