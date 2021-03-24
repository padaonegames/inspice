import { useEffect, useState } from 'react';

const useRecorder = (): [
  string | undefined,
  boolean,
  () => void,
  () => void
] => {
  const [audioURL, setAudioURL] = useState<string | undefined>(undefined);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recorder, setRecorder] = useState<MediaRecorder | undefined>(undefined);

  useEffect(() => {
    // Si no hay un grabador activo, lo obtenemos en la primera carga
    if (recorder === undefined) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    recorder.addEventListener("dataavailable", (e: any) => {
      const event = e as BlobEvent;
      setAudioURL(URL.createObjectURL(event.data));
    });
    // return () => recorder.removeEventListener("dataavailable", handleData);
  }, [recorder, isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  return [audioURL, isRecording, startRecording, stopRecording];
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
export default useRecorder;
