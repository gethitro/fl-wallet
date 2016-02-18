var ReceivePageView = Backbone.View.extend({

    initialize:function(options){
        _(this).bindAll("update", "scheduleUpdate", "copyAddressToClipboard", "copyUriToClipboard");
        this.accounts = new AccountSelect({collection:options.accounts});
        this.clipboard = options.clipboard;
        this.template = _.template($("#receive_tpl").html());
    },

    render:function(){
        this.$el.html(this.template());
        this.accounts.$el = this.$el.find("#receiveTo");
        this.accounts.render();
        this.msg = this.$el.find("#receiveMessage");
        this.amount = this.$el.find("#receiveAmount");
        this.uri = this.$el.find(".txtURI");
        this.qr = new QRCode(this.$el.find("#receiveQR").get(0), {
            width : 480,
            height : 480,
            colorDark: "#1C2E30",
            colorLight: "rgba(255,255,255,0)",
            correctLevel : QRCode.CorrectLevel.M
        });
        this.update();
        this.msg.on("input",this.scheduleUpdate);
        this.amount.on("input", this.scheduleUpdate);
        this.msg.on("change",this.update);
        this.amount.on("change",this.update);
        this.accounts.on("change", this.update);

        this.$el.find("#copyReceiveURI").click(this.copyUriToClipboard);
        this.$el.find("#copyReceiveAddress").click(this.copyAddressToClipboard);
    },

    update:function(){
        this.timer = undefined;
        var uri = this.getURI();
        this.uri.html(uri);
        this.qr.makeCode(uri);
    },

    scheduleUpdate:function(){
        if(this.timer==undefined){
            this.timer = setTimeout(this.update, 2000);
        }
    },

    getSelectedAddress:function(){
        var account = this.accounts.selected();
        return account.get("address")||account.get("stealth")
    },

    getURI:function(){
        var uri = "ethereum:"+this.getSelectedAddress();
        var msg = this.msg.val();
        var amount = this.amount.val();
        var attrs = [];
        if(amount){
            attrs.push("amount="+amount);
        }
        if(msg){
            attrs.push("message="+msg);
        }
        if(attrs.length){
            uri+="?"+attrs.join("&");
        }
        return uri;
    },

    copyAddressToClipboard:function(){
        alert("copying address");
        this.clipboard.setText(this.getSelectedAddress());
    },

    copyUriToClipboard:function(){
        alert("copying uri");
        this.clipboard.setText(this.getURI());
    }

})
