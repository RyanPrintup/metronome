var metronome = new Metronome();
var tempo = document.getElementById('tempo');
tempo.textContent = metronome.tempo;

const playButton = document.getElementById('play-button');
const playPauseIcon = document.getElementById('play-pause-icon');
playButton.addEventListener('click', function() {
    metronome.startStop();

    if ( metronome.isRunning )
    {
        playPauseIcon.className = 'pause';
    }
    else
    {
        playPauseIcon.className = 'play';
    }

});

const tempoChangeButtons = document.getElementsByClassName('tempo-change');
for ( var i = 0; i < tempoChangeButtons.length; i++ )
{
    tempoChangeButtons[i].addEventListener( 'click', function() {
        metronome.tempo += parseInt( this.dataset.change );
        tempo.textContent = metronome.tempo;
    });
}

const timeSignatureSelect = document.getElementById( 'time-signature' );
timeSignatureSelect.addEventListener( 'change', function() {
    if ( this.value == "3/4" || this.value == "6/8" )
    {
        metronome.setTimeSignature( 3 );
    }
    else
    {
        metronome.setTimeSignature( 4 );
    }
});