package com.example.tapify;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.media.MediaPlayer;
import android.os.Build;
import android.util.Log;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.widget.LinearLayout;
import android.widget.Toast;
import android.Manifest;
import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;


import java.util.List;

public class MainActivity extends AppCompatActivity {
    private PermissionManager permissionManager;

    @RequiresApi(api = Build.VERSION_CODES.TIRAMISU)
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        permissionManager = new PermissionManager(this);
        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);
        if(!hasAudioPermissions){
        }

        loadWebPage();
    }

    @SuppressLint("SetJavaScriptEnabled")
    void loadWebPage() {
        WebView webView = findViewById(R.id.webView);

        webView.getSettings().setLoadsImagesAutomatically(true);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAllowContentAccess(true);
        webView.clearCache(true);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.addJavascriptInterface(this, "Dialog");
        webView.loadUrl("file:///android_asset/index.html");
    }

    @JavascriptInterface
    public String playMusic(String testString) {
        playMusic();

        return testString + "and t" +
                "his was sent from Java.";
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.d("MainActivity", "Started request permission result");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        permissionManager.handlePermissionResult(requestCode, permissions, grantResults);
    }

    private void playMusic() {
        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);
        if(!hasAudioPermissions){
            Log.d("MainActivity", "No audio permissions - playMusic()");
            return;
        }

        SongManager songManager = new SongManager(this);
        List<Song> songs = songManager.fetchSongsFromStorage();

//        Log.d("MainActivity", songs.toString());
//
//        for(Song s : songs){
//            s.printData();
//        }

        try {
            MediaPlayer mediaPlayer = new MediaPlayer();
            mediaPlayer.setDataSource(songs.get(0).getPath());
            mediaPlayer.prepare();
            mediaPlayer.start();
            Toast.makeText(this, "Playing Music", Toast.LENGTH_SHORT).show();
        } catch (Exception e) {
            Toast.makeText(this, "Failed to play music", Toast.LENGTH_SHORT).show();
        }
    }
}