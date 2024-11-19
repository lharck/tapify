package com.example.tapify;

import android.database.Cursor;
import android.os.Build;
import android.provider.MediaStore;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.List;

public class SongManager {
    private final AppCompatActivity activity;

    SongManager(AppCompatActivity activity){
        this.activity = activity;
    }

    @NonNull
    public String toString(){
        List<Song> songs = fetchSongsFromStorage();
        StringBuilder songsString = new StringBuilder();

        for(Song s : songs){
            songsString.append(s.getData()).append("\n---");
        }
        return songsString.toString();
    }

    public List<Song> fetchSongsFromStorage() {
        List<Song> songs = new ArrayList<>();
        String[] projection = {
                MediaStore.Audio.Media._ID,
                MediaStore.Audio.Media.TITLE,
                MediaStore.Audio.Media.ARTIST,
                MediaStore.Audio.Media.ALBUM,
                MediaStore.Audio.Media.DURATION,
                MediaStore.Audio.Media.DATA,
                MediaStore.Audio.Media.GENRE,
                MediaStore.Audio.Media.ALBUM_ID
        };

        String selection = MediaStore.Audio.Media.IS_MUSIC + " != 0";
        String sortOrder = MediaStore.Audio.Media.TITLE + " ASC";

        Cursor cursor = this.activity.getContentResolver().query(
                MediaStore.Audio.Media.EXTERNAL_CONTENT_URI,
                projection,
                selection,
                null,
                sortOrder
        );

        if (cursor != null) {
            while (cursor.moveToNext()) {
                long id = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media._ID));
                String title = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.TITLE));
                String artist = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ARTIST));
                String album = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM));
                long duration = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DURATION));
                String data = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.DATA));
                String genre = cursor.getString(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.GENRE));
                long albumId = cursor.getLong(cursor.getColumnIndexOrThrow(MediaStore.Audio.Media.ALBUM_ID));
                Log.d("MainAction", title + "\nartist: " + artist + "\nalbum: " +  album + "\ngenre: " +  genre + "\nduration: " +  duration + "\ndata:" +  data + "\nalbum id:" +  albumId);

                songs.add(new Song(title, artist, album, genre, duration, data, albumId));
            }
            cursor.close();
        }

        return songs;
    }
}
