package com.example.tapify;

import android.os.Parcel;
import android.os.Parcelable;
import android.util.Log;

public class Song {
    public String title;
    public String artist;
    public String album;
    public String genre;
    public long duration;
    public String data;
    public long albumId;
    public String path;

    public Song(String title, String artist, String album, String genre, long duration, String data, long albumId) {
        this.title = title;
        this.artist = artist;
        this.album = album;
        this.genre = genre;
        this.duration = duration;
        this.data = data;
        this.albumId = albumId;
        this.path = path;
    }

    public String getData(){
        String data = "\nTitle:"
                + this.title
                + "\nArtist:"  + this.artist
                + "\nPath:" + this.path
                + "\nAlbum:" + this.album
                + "\nGenre:" + this.genre
                + "\nData:" + this.data
                + "\nAlbumId:" + this.albumId
                + "\nPath:" + this.path;

        return data;
    }
}