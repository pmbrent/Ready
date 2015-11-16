# Phase 6: Rating, Reviews, & Recommendations (1.5 days)

## Rails
### Models
* Rating

### Controllers
* Api::RatingsController (create, destroy, index, edit, update)

### Views
* /user/:id/rated

## Flux
### Views (React Components)
* Rating

### Stores
* Rating

### Actions
* ApiActions.receiveAllRatings
* ApiActions.receiveRating
* ApiActions.deleteRating

### ApiUtil
* ApiUtil.fetchAllRatings
* ApiUtil.fetchRating
* ApiUtil.removeRating

## Gems/Libraries
* Flux Dispatcher
