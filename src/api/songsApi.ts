import { AddSongRequestPayload } from "../features/songSlice";
import { Song } from "../types";

const baseUrl = 'https://ananiya.pythonanywhere.com/data';

export const getAllSongs = async (): Promise<Song[]> => {
    console.log('getAllSongs');
  const response = await fetch(baseUrl);
  return response.json();
};

export const getSong = async (id: number): Promise<Song> => {
    console.log('getSong');
  const response = await fetch(`${baseUrl}/${id}`);
  return response.json();
};

export const deleteSong = async (id: number): Promise<void> => {
    console.log('deleteSong');
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};

export const createSong = async (request: AddSongRequestPayload): Promise<Song> => {
    console.log('createSong');
    let audioUrl = '';
    const formData = new FormData(request.e.currentTarget);
    formData.append('duration', request.duration);
    console.log(formData.get('file'));
    if (formData.get('file') != null) {
    const response = await uploadFileToS3(formData);
    if (response != null) {
        audioUrl = response?.url;
    }
    }

    const songData = {
        name: formData.get('name')?.toString() ?? '',
        album: formData.get('album')?.toString() ?? '',
        artist: formData.get('artist')?.toString() ?? '',
        albumArt: formData.get('url')?.toString() ?? '',
        audioUrl: audioUrl,
        duration: request.duration
    }

    if (songData.name === '') {
      songData.name = 'Unknown';
    }

    if (songData.album === '') {
      songData.album = 'Unknown';
    }

    if (songData.artist === '') {
      songData.artist = 'Unknown';
    }

    console.log(songData);
    const song = songData as Song;
    const addResponse = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    });
    return addResponse.json();
};

export const editSong = async (form: FormData): Promise<Song> => {
    console.log('editSong');
    const songData = {
        name: form.get('name')?.toString() ?? '',
        album: form.get('album')?.toString() ?? '',
        artist: form.get('artist')?.toString() ?? '',
        albumArt: form.get('url')?.toString() ?? '',
        audioUrl: form.get('audioUrl')?.toString() ?? '',
        duration: form.get('duration')?.toString() ?? '',
        id: form.get('id') ?? 0
    }

    if (songData.name === '') {
      songData.name = 'Unknown';
    }

    if (songData.album === '') {
      songData.album = 'Unknown';
    }

    if (songData.artist === '') {
      songData.artist = 'Unknown';
    }

    const song = songData as Song;
    song.id = Number(song.id);
  const response = await fetch(`${baseUrl}/${song.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(song),
  });
  return response.json();
};

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
  formData.append('fileUpload', data.get('file') as Blob);

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
