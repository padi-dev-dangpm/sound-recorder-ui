import { useReactMediaRecorder } from "react-media-recorder";

const App = () => {
	const { status, startRecording, stopRecording, mediaBlobUrl } =
		useReactMediaRecorder({ video: false });
	const handleSave = async () => {
		const audioBlob = await fetch(mediaBlobUrl).then((r) => r.blob());
		const audioFile = new File([audioBlob], "voice.wav", { type: "audio/wav" });

		const response = await fetch(
			"https://api-inference.huggingface.co/models/facebook/wav2vec2-base-960h",
			{
				headers: {
					Authorization: "Bearer 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",
				},
				method: "POST",
				body: audioFile,
			}
		);
		const result = await response.json();
		console.log(result);
	};
	return (
		<div>
			<p>{status}</p>
			<button onClick={startRecording}>Start Recording</button>
			<button onClick={stopRecording}>Stop Recording</button>
			<button onClick={handleSave}>Save</button>

			<video src={mediaBlobUrl} controls autoPlay loop />
		</div>
	);
};

export default App;
