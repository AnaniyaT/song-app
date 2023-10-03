import React from "react";

interface FileUploadResponse {
    url: string
    filename: string
    size: number
    type: string
}

async function uploadFileToS3(data: FormData) : Promise<FileUploadResponse | null> {
    const apiUrl = 'https://www.filestackapi.com/api/store/S3';
    const apiKey = 'Ar6ktykAXRjCEu3LbfH6mz';

    const formData = new FormData();
    formData.append('fileUpload', data.get('song') as Blob);
  
    try {
      const response = await fetch(apiUrl + `?key=${apiKey}`, {
        method: 'POST',
        body: formData,
        headers: {
        },
      });
  
      const data = await response.json();
      console.log('File uploaded successfully. Response:', data);
      return data;
    } catch (error) {
      console.error('Error uploading file to S3:', error);
      return null;
    }
}

function getSongDuration(event: React.ChangeEvent<HTMLInputElement>, callback: (duration: string) => void) {
    const input = event.target as HTMLInputElement;
    const file = (input.files as FileList)[0];

    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const audioData = e.target?.result as ArrayBuffer;

            audioContext.decodeAudioData(audioData, function(decodedData) {
                const durationInSeconds = decodedData.duration;
                const durationFormatted = formatDuration(durationInSeconds);

                console.log('Duration:', durationFormatted);
                callback(durationFormatted);
            });

        };

        reader.readAsArrayBuffer(file);

    }
}

function formatDuration(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}







export { uploadFileToS3, getSongDuration };