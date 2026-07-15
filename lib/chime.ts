export function playChime() {
  import("tone")
    .then((Tone) => {
      Tone.start();
      const synth = new Tone.PolySynth(Tone.Synth).toDestination();
      synth.volume.value = -8;
      const now = Tone.now();
      ["C5", "E5", "G5", "C6"].forEach((n, i) => synth.triggerAttackRelease(n, "8n", now + i * 0.18));
    })
    .catch(() => {});
}
