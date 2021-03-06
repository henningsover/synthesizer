$(document).ready(() => {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();

  const $keys = $(".key");

  $keys.on("mousedown", function() {
    let key = this.id;
    console.log(key);
    fetch("tones.json")
      .then(res => res.json())
      .then(data => getTone(data, key));
  });

  const getTone = (data, key) => {
    let [chosenTone] = data.filter(tone => {
      return tone.toneName == key;
    });
    playNote(chosenTone);
  };

  function playNote(chosenTone) {
    console.log(chosenTone);
    let $osc1Wave = $("input[name=osc1_waves]:checked").val();
    osc1 = ctx.createOscillator();
    osc1.type = $osc1Wave;
    osc1.frequency.value = chosenTone["freq"];

    let $osc2Wave = $("input[name=osc2_waves]:checked").val();
    osc2 = ctx.createOscillator();
    osc2.type = $osc2Wave;
    osc2.frequency.value = chosenTone["freq"];
    osc2.detune.value = 10;

    osc1.connect(ctx.destination);
    osc2.connect(ctx.destination);
    osc1.start(0);
    osc2.start(0);
  }

  $keys.on("mouseup", function() {
    osc1.disconnect();
    osc2.disconnect();
  });
});
