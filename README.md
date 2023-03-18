# YTDownloader
Simple YouTube Downloader Command Line Tool using ytdl-core and ffmpeg. This tool was written  to automate download music for my media server. 

# Usage
clone the respository and use below commands
```
node index.js

Usage: node index.js [options]

Options:
  -i, --input     input file that contains a list of URL or a single URL
  -o, --output    output directory (default: 10)
  -f, --format    The output format (choices: "mp3", "mp4")
  -h, --help      show help information 
```
  
## Example
`node index.js -i input.txt -o output/ -f mp4`
