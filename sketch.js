//
//	Mini projet de reprodution d'un Filtre PAssBande sous JavaScript.
//

var noise;
var fft;
var filter, filterFreq, filterWidth;

function setup() {
  createCanvas(900, 400);
  fill(255, 40, 255);

  filter = new p5.BandPass();
  noise = new p5.Noise();

  noise.disconnect(); // Deconnecte le master out.
  filter.process(noise); // ...et le reconnect pour entendre le "bruit" du filtre BandPass.
  noise.start();

  fft = new p5.FFT();
}

function draw() {
  background(40);

  // Map mouseX avec le FFT sur les frequences: 10Hz - 22050Hz
  filterFreq = map (mouseX, 0, width, 10, 22050);
  // Map mouseY pour la  resonance en fonction de width
  filterWidth = map(mouseY, 0, height, 0, 90);
  // parametre du filtre.
  filter.set(filterFreq, filterWidth);

  // Draw every value in the FFT spectrum analysis where
  // x vas de 10Hz à 22050Hz
  // h = energy en fonctiond de l'amplitude de la frequence.
  var spectrum = fft.analyze();
  noStroke();
  for (var i = 0; i< spectrum.length; i++){
    var x = map(i, 0, spectrum.length, 0, width);
    var h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h) ;
  }
}