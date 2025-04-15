$(document).ready(function(){
    loading ();
    function loading (){
         var fullText = "Oh, Hello There";
            var currentIndex = 0;
            function revealText() {
                if (currentIndex <= fullText.length) {
                    $('#loadingText').text(fullText.substring(0, currentIndex));
                    currentIndex++;
                    setTimeout(revealText, 150);
                }
            }
            revealText();
        }
});