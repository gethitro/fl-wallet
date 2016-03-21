var SettingsPageView = SubPageView.extend({

    initialize:function(options){
        _(this).bindAll(
            "updateShowTray",
            "updateMinimizeTray",
            "updateCloseTray",
            "changeShowTray",
            "changeMinimizeTray",
            "changeCloseTray"
        );
        this.config = options.config;
        SubPageView.prototype.initialize.call(this,options);
        this.template = options.templates.get("settings");
        this.$el.html(this.template());
        this.menu = new MenuView({el: this.$el.find(".btns")});
        this.menu.on("change", options.router.redirect);
        this.trayToggle = this.$el.find("#trayToggle");
        this.trayMinimize = this.$el.find("#trayMinimize");
        this.trayClose = this.$el.find("#trayClose");
        this.trayToggle.button({text:false});
        this.trayMinimize.button({text:false});
        this.trayClose.button({text:false});

        this.updateShowTray();
        this.updateMinimizeTray();
        this.updateCloseTray();

        this.config.on("change:tray", this.updateShowTray);
        this.config.on("change:tray_minimize", this.updateMinimizeTray);
        this.config.on("change:tray_close", this.updateCloseTray);
        this.trayToggle.on("change", this.changeShowTray);
        this.trayMinimize.on("change", this.changeMinimizeTray);
        this.trayClose.on("change", this.changeCloseTray);
    },

    render:function(){
        this.menu.render();
    },

    updateShowTray:function(){
        this.updateOption(this.trayToggle, "tray");
    },

    updateMinimizeTray:function(){
        this.updateOption(this.trayMinimize, "tray_minimize");
    },

    updateCloseTray:function(){
        this.updateOption(this.trayClose, "tray_close");
    },

    updateOption:function(checkbox, name){
        var opt = this.config.getFlag(name);
        if(opt!=checkbox.prop("checked"))
        {
            checkbox.prop("checked", opt);
            checkbox.button("refresh");
        }
    },

    changeShowTray:function(){
        this.changeOption(this.trayToggle, "tray");
    },

    changeMinimizeTray:function(){
        this.changeOption(this.trayMinimize, "tray_minimize");
    },

    changeCloseTray:function(){
        this.changeOption(this.trayClose, "tray_close");
    },

    changeOption:function(checkbox, name){
        var opt = checkbox.prop("checked");
        this.config.setFlag(name, opt);
    }
});
