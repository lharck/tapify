package com.example.musicplayer;

import android.content.Context;
import android.content.res.Resources;
import android.graphics.Color;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.View;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;

import androidx.appcompat.widget.AppCompatImageView;
import androidx.cardview.widget.CardView;

public class ArtistFrame extends CardView {

    private final Context context;

    public ArtistFrame(Context context) {
        super(context);
        this.context = context;
    }

    public int getPx(int dip){
        Resources r = getResources();

        return (int)TypedValue.applyDimension(
                TypedValue.COMPLEX_UNIT_DIP,
                dip,
                r.getDisplayMetrics()
        );
    }



    public CardView create(){
        CardView card = createCardView();
        ImageView imgView = createImageView();
//        TextView textView = createTextView();
        card.addView(imgView);
//        card.addView(textView);

        return card;
    }

    private TextView createTextView() {
        TextView artistNameList = new TextView(context);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                getPx(20),
                LinearLayout.LayoutParams.MATCH_PARENT
        );
        params.leftMargin = (int) getResources().getDisplayMetrics().density * 10;
        params.weight = 1;
        params.gravity = Gravity.CENTER_VERTICAL;

        artistNameList.setLayoutParams(params);
        artistNameList.setText("ArtistName");
        artistNameList.setTextColor(Color.parseColor("#CBCDD1"));
        artistNameList.setTextSize(TypedValue.COMPLEX_UNIT_SP, 34);

        return artistNameList;
    }


    private ImageView createImageView() {
        AppCompatImageView albumImageList = new AppCompatImageView(context);

        LinearLayout.LayoutParams params = new LinearLayout.LayoutParams(
                getPx(400),
                LinearLayout.LayoutParams.MATCH_PARENT
        );

        int marginInPixels = (int) getResources().getDisplayMetrics().density * 5;
        params.setMargins(marginInPixels, marginInPixels, marginInPixels, marginInPixels);

        albumImageList.setLayoutParams(params);
        albumImageList.setImageResource(R.drawable.homeicon);

        return albumImageList;
    }

    public CardView createCardView(){
        CardView cardView = new CardView(context);

        float density = context.getResources().getDisplayMetrics().density;
        int widthInPx = (int) (40 * density);
        int marginInPx = (int) (5 * density);

        LinearLayout.LayoutParams layoutParams = new LinearLayout.LayoutParams(widthInPx, LinearLayout.LayoutParams.MATCH_PARENT);
        layoutParams.setMargins(marginInPx, marginInPx, marginInPx, marginInPx);
        layoutParams.weight = 1;

        cardView.setLayoutParams(layoutParams);

        return cardView;
    }

}
