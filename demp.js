

(function(){
  //   <source src="horse.ogg" type="audio/ogg">
  var playCont = function(mus){
    function volControl(music){
      this.music = music;
      this.dom = {
        "audio":dom("#audio"),
        "sun":dom(".sun"),
        "moon":dom(".moon"),
        "perc":dom(".per"),
        "wrap":dom(".wrapper")
      };
      this.top = this.dom["moon"].offsetTop;
      // 页面初始化
      this.init();
  };
  volControl.prototype.init = function(){
    // 生成音乐 html
    this.musicTrends();
  };
  volControl.prototype.musicTrends = function(){
    var html = `<source src=${this.music} type="audio/ogg">`;
    this.dom.audio.innerHTML = html;
    //事件绑定 
    this.eventClick();
  };
  volControl.prototype.eventClick = function(){
    var moon = this.dom["moon"];
    var that = this;
    moon.onmousedown = function(e){
        var clientX = e.clientX;
        var left = clientX-this.offsetLeft-that.dom["wrap"].offsetLeft;
      document.body.onmousemove = function(e){
        moon.style.top = that.top +"px";
        moon.style.left = e.clientX - left-that.dom["wrap"].offsetLeft +"px";
        that.getVoice();
      };
      document.body.onmouseup = function(){
        document.body.onmousemove = null;
        document.body.onmouseup = null;
      }
    };
  };
  volControl.prototype.getVoice = function(){
    var per;
    var w = this.dom["sun"].offsetWidth;
    var sunL = this.dom["sun"].offsetLeft;
    var sunR = sunL+w;
    var moonL = this.dom["moon"].offsetLeft;
    var moonR = moonL + w;
    // 碰不到的情况
    if(sunL>moonR||sunR<moonL){
      per=0;
    }else{
      if( moonL>sunL ){
        per = (sunR - moonL) /w
      }else if( moonR>=sunL ){
        per = (moonR - sunL) /w
      }
    }
    console.log(per);
    this.change(per);

  };
  volControl.prototype.change = function(per){
    this.dom["audio"].volume = per;
    this.dom["moon"].style.backgroundColor = "hsl(194, 56%, " + (1 - per) * 60 + "%)";
    this.dom["perc"].innerText = (per * 100).toPrecision(4) + "%";
    document.body.style.backgroundColor =  "hsl(" + (194 + Math.floor(166 * per)) + ", 66%, " + (1 - per) * 50 + "%)";
  }
  // dom 获取
  function dom(elem){
    return document.querySelector(elem);
  };
  return new volControl(mus);
};
window.volControl =  playCont;
    
}());
