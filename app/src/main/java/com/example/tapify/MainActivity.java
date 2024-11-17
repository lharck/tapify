package com.example.tapify;

import android.annotation.SuppressLint;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.media.MediaPlayer;
import android.os.Build;
import android.util.Log;
import android.os.Bundle;
import android.webkit.JavascriptInterface;
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

        if(hasAudioPermissions){
            playMusic();
        } else {
            Log.d("MainActivity", "Does not have music permission upon opening the app");
        }

        loadWebPage();
    }


    @SuppressLint("SetJavaScriptEnabled")
    void loadWebPage() {
        WebView webView = findViewById(R.id.webView);
        webView.loadUrl("file:///android_asset/index.html");

        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setSupportZoom(true);
        webView.addJavascriptInterface(this, "Dialog");
    }

    @JavascriptInterface
    public void playMusic(String testString) {
        AlertDialog.Builder builder = new AlertDialog.Builder(MainActivity.this);
        builder.setTitle("Confirmation").setMessage("Here's the test string:\t" + testString)
                .setPositiveButton("Ok", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialogInterface, int i) {
//                        Toast.makeText(getApplicationContext(), " Data Saved Locally", Toast.LENGTH_SHORT).show();
                        boolean hasAudioPermissions = permissionManager.isPermissionAccepted(Manifest.permission.READ_MEDIA_AUDIO);

                        if(hasAudioPermissions){
                            playMusic();
                        }
                    }
                })
        ;
        builder.create().show();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        Log.d("MainActivity", "Started request permission result");
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        permissionManager.handlePermissionResult(requestCode, permissions, grantResults);
    }

    private void playMusic() {
        SongManager songManager = new SongManager(this);
        List<Song> songs = songManager.fetchSongsFromStorage();

        Log.d("MainActivity", songs.toString());

        for(Song s : songs){
            s.printData();
        }

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