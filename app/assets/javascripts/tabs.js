$.Tabs = function (el) {
  this.$el = $(el);
  this.$activeTab = $(this.$el.find(".active"));
  this.$el.on("click", "a", function (event) {
    event.preventDefault();
    this.clickTab(event);
    window.location = event.currentTarget.href;
  }.bind(this));
};

$.fn.tabs = function () {
  return this.each(function () {
    new $.Tabs(this);
  });
};

$.Tabs.prototype.clickTab = function(event) {
  this.$activeTab.removeClass("active");
  this.$activeTab = $(event.currentTarget);
  this.$activeTab.addClass("active");
};

$.Tabs.prototype.resetTabs = function() {
  this.$activeTab.removeClass("active");
};
