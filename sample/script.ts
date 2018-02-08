const SAMPLE_RATE = 44100
const audioCtx = new AudioContext()

/**
 * Convert to time from BPM and beat.
 * @param bpm BPM
 * @param beat Beat
 */
function beatToTime(bpm: number, beat: number) {
  let beatLength = 60 / bpm
  return (beat - 1) * beatLength
}

async function generateMelodyAndPlay() {

  const BPM = 205
  const offsetBeat = 4
  const audioLength = beatToTime(BPM, 64)

  const at = new ATrack(2, SAMPLE_RATE, audioLength)

  // Put regions one by one
  await at.put('vo/ki.mp3', beatToTime(BPM, 1 + offsetBeat))
  await at.put('vo/ri.mp3', beatToTime(BPM, 1.5 + offsetBeat))
  await at.put('vo/n.mp3', beatToTime(BPM, 2.5 + offsetBeat))
  await at.put('vo/sa.mp3', beatToTime(BPM, 3 + offsetBeat))
  await at.put('vo/n.mp3', beatToTime(BPM, 3.5 + offsetBeat))

  await at.put('vo/ki.mp3', beatToTime(BPM, 5 + offsetBeat))
  await at.put('vo/ri.mp3', beatToTime(BPM, 5.5 + offsetBeat))
  await at.put('vo/n.mp3', beatToTime(BPM, 6.5 + offsetBeat))
  await at.put('vo/sa.mp3', beatToTime(BPM, 7 + offsetBeat))
  await at.put('vo/n.mp3', beatToTime(BPM, 7.5 + offsetBeat))

  await at.put('vo/ku.mp3', beatToTime(BPM, 9 + offsetBeat))
  await at.put('vo/bi.mp3', beatToTime(BPM, 9.5 + offsetBeat))
  await at.put('vo/ga.mp3', beatToTime(BPM, 10.5 + offsetBeat))
  await at.put('vo/na.mp3', beatToTime(BPM, 11 + offsetBeat))
  await at.put('vo/ga.mp3', beatToTime(BPM, 11.5 + offsetBeat))
  await at.put('vo/i.mp3', beatToTime(BPM, 12 + offsetBeat))
  await at.put('vo/no.mp3', beatToTime(BPM, 12.5 + offsetBeat))

  await at.put('vo/ne.mp3', beatToTime(BPM, 13 + offsetBeat))

  // Or, put regions at once
  await at.putAll([
    { url: 'vo/ki.mp3', time: beatToTime(BPM, 17 + offsetBeat) },
    { url: 'vo/ri.mp3', time: beatToTime(BPM, 17.5 + offsetBeat) },
    { url: 'vo/n.mp3', time: beatToTime(BPM, 18.5 + offsetBeat) },
    { url: 'vo/sa.mp3', time: beatToTime(BPM, 19 + offsetBeat) },
    { url: 'vo/n.mp3', time: beatToTime(BPM, 19.5 + offsetBeat) },

    { url: 'vo/ki.mp3', time: beatToTime(BPM, 21 + offsetBeat) },
    { url: 'vo/ri.mp3', time: beatToTime(BPM, 21.5 + offsetBeat) },
    { url: 'vo/n.mp3', time: beatToTime(BPM, 22.5 + offsetBeat) },
    { url: 'vo/sa.mp3', time: beatToTime(BPM, 23 + offsetBeat) },
    { url: 'vo/n.mp3', time: beatToTime(BPM, 23.5 + offsetBeat) },

    { url: 'vo/tu.mp3', time: beatToTime(BPM, 25 + offsetBeat) },
    { url: 'vo/no.mp3', time: beatToTime(BPM, 25.5 + offsetBeat) },
    { url: 'vo/mo.mp3', time: beatToTime(BPM, 26.5 + offsetBeat) },
    { url: 'vo/a.mp3', time: beatToTime(BPM, 27 + offsetBeat) },
    { url: 'vo/ru.mp3', time: beatToTime(BPM, 27.5 + offsetBeat) },
    { url: 'vo/no.mp3', time: beatToTime(BPM, 28.5 + offsetBeat) },

    { url: 'vo/ne.mp3', time: beatToTime(BPM, 29 + offsetBeat) }
  ])

  // Mix another audio into track
  await at.put('bgm.mp3', 0)

  // Render audio data
  const renderedBuffer = await at.render()
  playAudioBuffer(audioCtx, renderedBuffer)
}

function playAudioBuffer(audioContext: AudioContextBase, audioBuffer: AudioBuffer) {

  const song = audioContext.createBufferSource()
  song.buffer = audioBuffer
  song.connect(audioContext.destination)
  song.start()
}

const playButton = document.getElementById('play')
if (playButton != null) {
  playButton.onclick = generateMelodyAndPlay
}