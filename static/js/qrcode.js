;
document.write('<script type="text/javascript" src = "../static/js/jquery.qrcode.min.js"></script>');//引入生成二维码的基础js
(function() {
    function Qrcode(obj) {
        this.src = obj.src;
        this.text = obj.text;
        this.url = obj.url;
        this.dom = obj.dom;
        this.onClose = obj.onClose;
        this.onSave = obj.onSave;
        this.init();
    }
    Qrcode.prototype = {
        constructor: Qrcode,
        init:function(){
            var self = this;
            if(!this.url){
                return false;
            }
            var canopy = '';
            if(this.dom){
                canopy = '<div style="width: 400px;height: 400px;background-color: #fff;position:relative;border:2px solid rgb(115, 175, 241);">'+
                            '<div class="qr-code-title" style="text-align:center;color:#3A99E6;height:40px;line-height:40px;margin:16px auto;">请扫描二维码</div>'+
                            '<div id="qr-code" style="position:absolute;top:50%;left:50%; transform:translate(-50%,-50%);"></div>'+
                            '<div style="text-align:center;height:20px;line-height:20px;position:absolute;top:350px;left:172px;">'+
                                '<a id="save-qrcode" style="cursor: pointer;color:#3A99E6">下载二维码</a>'+
                                '<a id="download-qrcode"></a>'+
                            '</div>'+
                        '</div>';
            }else{
                canopy = '<div class="qrcode-canopy-div" style="left:0px;top:0px;position:fixed;height:100%;width:100%;z-index:10000;">'+
                            '<div style="position:absolute; left:50%; top:50%; transform:translate(-50%,-50%);z-index:999;border:2px solid rgb(115, 175, 241);">'+
                                '<img id="close-qrcode" style="position:absolute;right:0px;top:0px;z-index:999999;" src="../static/img/close.png" alt="">'+
                                '<div style="width: 400px;height: 400px;background-color: #fff;position:relative;">'+
                                    '<div class="qr-code-title" style="text-align:center;color:#3A99E6;height:60px;line-height:60px;">请扫描二维码</div>'+
                                    '<div id="qr-code" style="position:absolute;top:50%;left:50%; transform:translate(-50%,-50%);"></div>'+
                                    '<div style="text-align:center;height:20px;line-height:20px;position:absolute;top:350px;left:172px;">'+
                                        '<a id="save-qrcode" style="cursor: pointer;color:#3A99E6">下载二维码</a>'+
                                        '<a id="download-qrcode"></a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>'+
                            '<div style="background:#000;filter:alpha(opacity=10);opacity:.4;left:0px;top:0px;position:absolute;height:100%;width:100%;"></div>'+
                        '</div>';
            }
            self.qid = 'qrcodeDiv'+ Date.parse(new Date());
            self.qr_code = document.createElement("div");
            self.qr_code.id = self.qid; 

            $(self.qr_code).append(canopy);
            $(self.qr_code).find('[id="qr-code"]').qrcode({
                foreground: "#3A99E6",
                background: "#fff",
                text: self.url,
                src:self.src,
                str:self.text,
                imgWidth: 80,
                imgHeight: 80
            });
            $(self.qr_code).find('[id="close-qrcode"]').click(function(){
                self.close();
            });
            $(self.qr_code).find('[id="save-qrcode"]').click(function(){
                self.save();
            });
        },
        show:function(){
            if(this.dom){
                this.dom.append(this.qr_code);
            }else{
                $("body").append(this.qr_code);
            }
        },
        close:function(){
            $("#"+this.qid).remove();
            this.onClose && this.onClose();
        },
        save:function(){
            var self = this;
            var timestamp = Date.parse(new Date());
            var canvas = $(self.qr_code).find("canvas").get(0);
            try {//解决IE转base64时缓存不足，canvas转blob下载
                var blob = canvas.msToBlob();
                navigator.msSaveBlob(blob, timestamp+'.jpg');
            } catch (e) {//如果为其他浏览器，使用base64转码下载
                var url = canvas.toDataURL('image/jpeg');
                $(self.qr_code).find('[id="download-qrcode"]').attr('href', url).attr("download",timestamp+".jpg").get(0).click();
            }
            this.onSave && this.onSave();
        }
    }
    window.Qrcode = Qrcode;
})();


