class RatingsController < ApplicationController

  def create
    @rating = Rating.new(user_id: current_user.id,
                         book_id: params[:book_id],
                         rating: params[:rating])
    @rating.save
    render json: @rating
  end

  def destroy
    @rating 
  end

private
  def ratings_params
    params.permit(:rating, :book_id)
  end

end
