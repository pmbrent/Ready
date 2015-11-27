(function(root) {
  CHANGE_EVENT = "change";
  RESET_EVENT = "reset";

  _recommendations = [];

  root.RecommendationStore = $.extend({}, EventEmitter.prototype, {

    all: function() {
      return _recommendations.slice();
    },

    fetchRecs: function(num) {
      return _recommendations.slice(0, num);
    },

    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },

    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },

    addResetListener: function(callback) {
      this.on(RESET_EVENT, callback);
    },

    removeResetListener: function(callback) {
      this.removeListener(RESET_EVENT, callback);
    },

    dispatcherID: AppDispatcher.register(function(payload) {
      switch(payload.actionType) {
        case RecommendationConstants.RECOMMENDATIONS_RECEIVED:
          _recommendations = payload.recommendations;
          RecommendationStore.emit(CHANGE_EVENT);
        break;
        case RecommendationConstants.RESET:
          _recommendations = [];
          RecommendationStore.emit(RESET_EVENT);
        break;
      }

    })

  });

})(this);
