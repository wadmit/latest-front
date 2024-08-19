export interface ITestimonialsVideoData {
	name: string;
	course: string;
	thumbnail: string;
	videoUrl: string;
}

export type TThumbnailWrapperProps = {
	thumbnail: string;
	videoUrl: string;
	name: string;
	course: string;
	isPlaying: boolean;
	onPlay: () => void;
};

export interface IThumbnailWrapperRef {
	pause: () => void;
}

export type TVideoProps = {
	videoUrl: string;
	ref: React.Ref<HTMLVideoElement>;
	isPlaying: boolean;
	thumbnail: string;
};
