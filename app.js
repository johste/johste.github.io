
let audioContext;

function play(frequency, time){

	const osc = audioContext.createOscillator();
	const volume = audioContext.createGain();

	osc.type = 'square';
	osc.frequency.value = frequency;

	osc.connect(volume);
	volume.connect(audioContext.destination);

	volume.gain.setValueAtTime(0, time);
	volume.gain.linearRampToValueAtTime(1, time + 1);
	// volume.gain = setValueAtTime(1, 3);
	volume.gain.linearRampToValueAtTime(0, time + 2);


	osc.start();

}

function sequence(){

	console.log('sequence');

	audioContext = new AudioContext();

	[100,250,150,50,70,200].forEach((item, index) => {
			play(item, index);
	});



}

function saw(frequencies, duration) {


	const osc = audioContext.createOscillator()
	osc.type = 'sawtooth';

	osc.frequency.setValueCurveAtTime(frequencies, audioContext.currentTime, duration);
	osc.connect(audioContext.destination);
	osc.start();


}

function curve (){

	audioContext = new AudioContext();
	saw([100*Math.random(), 300*Math.random(), 100*Math.random()], 5*Math.random())

}

function noise(){

	if(!audioContext){
		audioContext = new AudioContext();
		console.log('no');
	}

	const noise = audioContext.createBufferSource();
	const buffer = audioContext.createBuffer(1, 4096, audioContext.sampleRate);
	let data = buffer.getChannelData(0s);

	for (var i = 0; i < 4096; i++) {
		data[i] = Math.random();
	}

	noise.buffer = buffer;
	noise.loop = true;

	let filter = audioContext.createBiquadFilter();
	filter.type = 'highpass';
	filter.frequency.value = 3000;

	noise.connect(filter);
	filter.connect(audioContext.destination);
	noise.start(audioContext.currentTime);

	for (var i = 0; i < 10; i++) {
		filter.frequency.setValueAtTime(10000*Math.random(), audioContext.currentTime + i)
	}
		noise.stop(audioContext.currentTime + 10);

}

document.getElementById('buttonSequence').addEventListener("click", sequence);
document.getElementById('buttonCurve').addEventListener("click", curve);
document.getElementById('buttonNoise').addEventListener("click", noise);
