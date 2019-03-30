//init speech synth api

const synth=window.speechSynthesis;

//Dom elements
const body=document.querySelector('body');
const textForm=document.querySelector('form');
const textInput=document.querySelector('#text-input');
const voiceSelect=document.querySelector('#voice-select');
const rate=document.querySelector('#rate');
const rateValue=document.querySelector('#rate-value');
const pitch=document.querySelector('#pitch');
const pitchValue=document.querySelector('#pitch-value');

//init voices array

let voices=[];

const getVoices =()=>{
    voices=synth.getVoices();
    
    //loop through all the voices

    voices.forEach(voice=>{
        //create the option element
        const option=document.createElement('option');
        //fill option with voice and language from the voice
        option.textContent=voice.name + '('+voice.lang+')';

        //set the option attributes
        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);
    });
}

getVoices();

if (synth.onvoiceschanged!==undefined) {
    synth.onvoiceschanged=getVoices;
}

//speak

const speak=()=>{
        //check if speakeing
    if(synth.speaking){
        console.error('Already speaking');
        return;
    }

    if(textInput.value!==''){
        //add background animations
        body.style.background='#141414 url(images/wave.gif)';
        body.style.backgroundRepeat='repeat-x';
        body.style.backgroundSize='100% 100%';

        //get speak text
        const speakText=new SpeechSynthesisUtterance(textInput.value);
        //Speak end
        speakText.onend = e =>{
            console.log('Done Speaking...');
            body.style.background='#141414';
        }

        //Speak error
        speakText.onerror = e =>{
            console.error('Something went wrong');
        }

        //Selected voice
        const SelectedVoice = voiceSelect.selectedOptions[0]
        .getAttribute('data-name');
        console.log(SelectedVoice);

        //Loop through voices
        voices.forEach(voice=>{
            if(voice.name===SelectedVoice){
                speakText.voice=voice;
                console.log(speakText.voice);
            }
        });

        //set voice pitch and rate
        speakText.rate=rate.value;
        speak.pitch=pitch.value;

        //speak
        synth.speak(speakText);
    }
};

//EVENT LISTENERS

//Text form submit
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
});

//Rate value change
rate.addEventListener('change',e=> rateValue.value=rate.value);
//pitch value change
pitch.addEventListener('change',e=>pitchValue.value=pitch.value);

//voice select changed
voiceSelect.addEventListener('change',e=>speak());