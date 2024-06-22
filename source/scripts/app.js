var metronome = new Metronome();
const accentBeatOne = document.getElementById( 'accent-beat-one' );
const tempo = document.getElementById( 'tempo' );
accentBeatOne.checked = metronome.accentBeatOne;
tempo.textContent = metronome.tempo;

const playButton = document.getElementById( 'play-button' );
const playPauseIcon = document.getElementById( 'play-pause-icon' );
playButton.addEventListener( 'click', function()
{
    metronome.startStop();
    playPauseIcon.className = metronome.isRunning ? 'pause' : 'play';
});

const tempoChangeButtons = document.getElementsByClassName( 'tempo-change' );
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

accentBeatOne.addEventListener( 'click', function()
{
    metronome.accentBeatOne = accentBeatOne.checked;
});

document.addEventListener( 'keydown', function onEvent( event )
{
    if ( event.code === 'ArrowLeft' )
    {
        metronome.tempo--;
    }
    else if ( event.code === 'ArrowRight' )
    {
        metronome.tempo++;
    }
    else if ( event.code === 'Space' )
    {
        metronome.startStop();
    }

    tempo.textContent = metronome.tempo;
});

// TODO: Add documentation around why this is needed and the method used.
function unlockWebAudioForIos( context )
{
    return new Promise( function ( resolve, reject )
    {
        if ( context.state === 'suspended' && 'ontouchstart' in window )
        {
            var unlock = function ()
            {
                context.resume().then( function ()
                {
                    document.body.removeEventListener( 'touchstart', unlock );
                    document.body.removeEventListener( 'touchend', unlock );

                    resolve( true );
                },
                function ( reason )
                {
                    reject( reason );
                });
            };

            document.body.addEventListener( 'touchstart', unlock, false );
            document.body.addEventListener( 'touchend', unlock, false );
        }
        else
        {
            resolve( false );
        }
    });
}
