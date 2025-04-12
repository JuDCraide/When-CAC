import videos from '../../public/videos_info.json'
export interface GuessVideo {
    formatted_title: string,
    //image_url: string
    video_id: string,
}

export interface VideoResponse {
    title: string,
    ep: number,
    video_id: string,
    date: string
}

interface Video {
    title: string,
    formatted_title: string,
    ep: number,
    video_id: string,
    date: string
}

function getGuessVideo(episode: number): GuessVideo {
    let result = videos.find(video => video.ep === episode)
    if (!result) {
        throw Error();
    }
    return result as GuessVideo;
}

function getResponseVideo(episode: number): VideoResponse {
    let result = videos.find(video => video.ep === episode)
    if (!result) {
        throw Error();
    }
    return result as VideoResponse;
}

export { getGuessVideo, getResponseVideo };