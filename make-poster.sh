#!/bin/bash

# Check if an input was provided
if [ -z "$1" ]; then
    echo "Usage: ./make-poster.sh [path/to/video.mp4 or path/to/dir]"
    exit 1
fi

INPUT=$1

# Function to generate poster for a single file
generate_poster() {
    local FILE=$1
    local DIR=$(dirname "$FILE")
    local FILENAME=$(basename "$FILE")
    local NAME="${FILENAME%.*}"
    local POSTER_DIR="$DIR/posters"
    local OUTPUT="$POSTER_DIR/$NAME.jpg"

    # Create the /posters subdirectory if it doesn't exist
    mkdir -p "$POSTER_DIR"

    echo "Processing: $FILENAME..."
    
    # FFmpeg Command: Native resolution, high quality, 1-second mark
    ffmpeg -i "$FILE" -ss 00:00:01 -vframes 1 -q:v 2 "$OUTPUT" -y -loglevel error

    if [ $? -eq 0 ]; then
        echo "Created: $OUTPUT"
    else
        echo "Failed to process $FILENAME"
    fi
}

# Check if input is a directory or a file
if [ -d "$INPUT" ]; then
    # Process all mp4 and webm files in the directory
    for f in "$INPUT"/*.{mp4,webm}; do
        [ -e "$f" ] || continue
        generate_poster "$f"
    done
elif [ -f "$INPUT" ]; then
    generate_poster "$INPUT"
else
    echo "Error: $INPUT is not a valid file or directory."
    exit 1
fi