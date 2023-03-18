const ytdl = require("ytdl-core");
const ffmpeg = require("fluent-ffmpeg");
const fs = require("fs");

async function YTdownload(link, output, format) {
    try {

        const info = await ytdl.getInfo(link);
        const videoTitle = info.videoDetails.title.replaceAll('/', '');
        const fileName = `${output}/${videoTitle}.${format}`;
        const stream = await ytdl(link, { filter: format === "mp3" ? "audioonly" : "audioandvideo", dlchunks: "8MB" });

        if (format === "mp3") {
            console.log("Download and convert to mp3")
            ffmpeg(stream)
                .audioCodec('libmp3lame')
                .audioBitrate(320)
                .format('mp3')
                .on('error', (err) => console.error(err))
                .on('end', () => console.log('Finished!'))
                .on("progress", (per) => { console.log(per) })
                .save(fileName, {
                    end: true
                })
        }
        else if (format === "mp4") {
            console.log(fileName)
            const file = fs.createWriteStream(fileName);
            stream.on("data", (chunk) => {
                file.write(chunk);
            })
            stream.on("end", () => {
                file.close();
            })

        }
    }
    catch (e) {
        console.error(e);
    }
}



module.exports = {
    YTdownload: YTdownload,
};