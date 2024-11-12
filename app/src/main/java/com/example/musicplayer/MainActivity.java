package com.example.musicplayer;

import android.media.MediaPlayer;
import android.util.Log;
import android.os.Bundle;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.Manifest;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;


import java.util.List;

public class MainActivity extends AppCompatActivity {
    private MediaPlayer mediaPlayer;
    private PermissionManager permissionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.artist);

        permissionManager = new PermissionManager(this);

        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);

        if(hasAudioPermissions){
            playMusic();
        }

        foo();
    }

    void foo(){
        ArtistFrame artistCard = new ArtistFrame(this);
        LinearLayout frames = findViewById(R.id.artistFrames);
        frames.addView(artistCard.create());
    }



    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        permissionManager.handlePermissionResult(requestCode, permissions, grantResults);

        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);

        if(hasAudioPermissions){
            playMusic();
        }
    }

    private void playMusic() {
        SongManager songManager = new SongManager(this);
        List<Song> songs = songManager.fetchSongsFromStorage();

        Log.d("MainActivity", songs.toString());

        for(Song s : songs){
            s.printData();
        }

        try {
            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(songs.get(0).getPath());
            mediaPlayer.prepare();
            mediaPlayer.start();
            Toast.makeText(this, "Playing Music", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Failed to play music", Toast.LENGTH_SHORT).show();
        }
    }
}
