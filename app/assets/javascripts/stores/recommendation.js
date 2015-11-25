(function(root) {
  CHANGE_EVENT = "change";

  _recommendations = [];

  root.RecommendationStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _recommendations.slice();
    },

    fetch: function(num) {
      return _recommendations.slice(0, num);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case RecommendationConstants.RECOMMENDATIONS_RECEIVED:
          _recommendations = payload.recommendations;
          RecommendationStore.emit(CHANGE_EVENT);
        break;
      }

    })

  });

})(this);
