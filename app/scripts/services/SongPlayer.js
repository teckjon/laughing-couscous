 (function () {
     function SongPlayer($rootScope, Fixtures) {
         var SongPlayer = {};

         var currentAlbum = Fixtures.getAlbum();
         /**
          * @desc Buzz object audio file
          * @type {Object}
          */
         var currentBuzzObject = null;

         /**
          * @function setSong
          * @desc Stops currently playing song and loads new audio file as currentBuzzObject
          * @param {Object} song
          */
         var setSong = function (song) {
             if (currentBuzzObject) {
                 currentBuzzObject.stop();
                 SongPlayer.currentSong.playing = null;
             }

             currentBuzzObject = new buzz.sound(song.audioUrl, {
                 formats: ['mp3'],
                 preload: true
             });
        
             currentBuzzObject.bind('timeupdate', function () {
                 $rootScope.$apply(function () {
                     SongPlayer.currentTime = currentBuzzObject.getTime();
                 });
             });
            
             SongPlayer.currentSong = song;
         };
         /**
          * @function playSong
          * @desc Plays a song
          * @param {Object} song
          */
         var playSong = function (song) {
             currentBuzzObject.play();
             song.playing = true;
         };
         /**
          * @function getSongIndex
          * @desc Gets index of current song
          * @param {Object} song
          */
         var getSongIndex = function (song) {
             return currentAlbum.songs.indexOf(song)
         };

         /** 
          * @function stopSong
          * @desc Stops the currently playing song
          * @param {Object} song
          */
         var stopSong = function (song) {
             currentBuzzObject.stop();
             song.playing = null;
         };

         SongPlayer.currentSong = null;

         /**
          * @desc Current playback time (in seconds) of currently playing song
          * @type {Number}
          */
         SongPlayer.currentTime = null;
         /**
          * @desc Sets volume
          * @type {Number}
          */
         SongPlayer.volume = 80;

         SongPlayer.play = function (song) {
            
             song = song || SongPlayer.currentSong;
             var song = currentAlbum.songs[0];
             if (SongPlayer.currentSong !== song) {
                 setSong(song);
             } else if (SongPlayer.currentSong < 0) {
                 
                 setSong(song);
             }
             playSong(song);
             
         };


         SongPlayer.pause = function (song) {
             song = song || SongPlayer.currentSong;
             currentBuzzObject.pause();
             song.playing = false;
         };

         /**
          * @controller SongPlayer.previous
          * @desc Plays the previous song
          * @param {Object} song
          */
         SongPlayer.previous = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex--;

             if (currentSongIndex < 0) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         SongPlayer.next = function () {
             var currentSongIndex = getSongIndex(SongPlayer.currentSong);
             currentSongIndex++;

             var lastSongIndex = currentAlbum.songs.length - 1;

             if (currentSongIndex > lastSongIndex) {
                 stopSong(SongPlayer.currentSong);
             } else {
                 var song = currentAlbum.songs[currentSongIndex];
                 setSong(song);
                 playSong(song);
             }
         };

         /**
          * @function setCurrentTime
          * @desc Set current time (in seconds) of currently playing song
          * @param {Number} time
          */
         SongPlayer.setCurrentTime = function (time) {
             if (currentBuzzObject) {
                 currentBuzzObject.setTime(time);
             }
         };
         
         /**
          * @function setVolume
          * @desc Sets the volume
          * @param {Number} time
          */
         SongPlayer.setVolume = function(volume) {
             if (currentBuzzObject) {
                 currentBuzzObject.setVolume(volume);
             }
             SongPlayer.volume = volume;
         }
         return SongPlayer;
     }

     angular
         .module('blocJams')
         .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
 })();