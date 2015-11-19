$.Carousel = function (el) {
  this.$el = $(el);
  this.$activeImg = $(this.$el.find(".book-items li")[0]);
  this.activate(this.$activeImg);
  this.shelfIdx = 0;
  this.$books = $(this.$el.find(".book-items li"));
  this.fillBookImages();

  this.bindListeners();
};

$.fn.carousel = function () {
  return this.each(function () {
    new $.Carousel(this);
  });
};

$.Carousel.prototype.bindListeners = function() {
  this.$el.on("mouseenter", ".book-items li", function(event) {
    this.activate($(event.currentTarget));
  }.bind(this));

  this.$el.on("mouseleave", ".book-items li", function(event) {
    this.activate(this.$activeImg);
  }.bind(this));

  this.$el.on("click", "a.slide", function(event) {
    event.preventDefault();
    if ($(event.currentTarget).text() === "◀") {
      if (this.shelfIdx !== 0) {
        this.shelfIdx -= 1;
        this.fillBookImages();
      }
    } else {
      if (this.shelfIdx < this.$books.length - 6) {
        this.shelfIdx += 1;
        this.fillBookImages();
      }
    }
  }.bind(this));
};

$.Carousel.prototype.activate = function($img) {
  this.$el.find(".active").empty();
  var $newActive = $("<li>");
  // $newActive.attr("src", ($img.attr("src")));
  this.$el.find(".active").append($newActive);
};

$.Carousel.prototype.fillBookImages = function() {
  this.$el.find(".book-items").empty();
  for (var i = this.shelfIdx; i < this.shelfIdx + 5; i++) {
    this.$el.find(".book-items").append($(this.$books[i]));
  }
};
