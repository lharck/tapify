package com.example.musicplayer;

import android.media.MediaPlayer;
import android.util.Log;
import android.os.Bundle;
import android.widget.Toast;
import android.Manifest;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
    private MediaPlayer mediaPlayer;
    private PermissionManager permissionManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        permissionManager = new PermissionManager(this);

        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);

        if(hasAudioPermissions){
            playMusic();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        permissionManager.handlePermissionResult(requestCode, permissions, grantResults);

        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);

        if(hasAudioPermissions){
            playMusic();
        }

        Log.d("MainActivity", "Request result made");
    }

    private void playMusic() {
        try {
            String musicPath = "/storage/emulated/0/Music/APMMusic/StrangeTropics/song.mp3";
            mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(musicPath);
            mediaPlayer.prepare();
            mediaPlayer.start();
            Toast.makeText(this, "Playing Music", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Failed to play music", Toast.LENGTH_SHORT).show();
        }
    }
}
