interface AudioItem {
  url: string
  time: number
}

/** 
 * Creates combined audio data from some pieces of audio data.
 */
class ATrack {

  private audioContext = new OfflineAudioContext(this.channels, this.sampleRate * this.lengthInSeconds, this.sampleRate)

  constructor(
    private channels: number,
    private sampleRate: number,
    private lengthInSeconds: number) { }

  /**
   * Load data as ArrayBuffer from URL.
   * @param url URL which points to data.
   */
  static async loadArrayBuffer(url: string): Promise<ArrayBuffer> {

    return new Promise<ArrayBuffer>((resolve, reject) => {

      const request = new XMLHttpRequest()
      request.open('GET', url, true)
      request.responseType = 'arraybuffer'
      request.onload = () => {
        resolve(request.response)
      }
      request.onerror = reject
      request.send()
    })
  }

  async putAll(regions: AudioItem[]) {
    const promises = regions.map(region => this.put(region.url, region.time))
    return Promise.all(promises)
  }

  /**
   * Put audio region to time.
   * @param url Audio data URL.
   * @param time Start time.
   */
  async put(url: string, time: number) {

    const audioData = await ATrack.loadArrayBuffer(url)
    const audioBuffer = await this.audioContext.decodeAudioData(audioData)

    this.putData(audioBuffer, time);
  }

  private putData(audioBuffer: AudioBuffer, time: number) {
    const source = this.audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(this.audioContext.destination);
    source.start(time);
  }

  /**
   * Start rendering and returns result AudioBuffer.
   */
  async render(): Promise<AudioBuffer> {
    return this.audioContext.startRendering()
  }

}
