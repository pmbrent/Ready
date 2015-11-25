class RatingsController < ApplicationController

  def create
    @rating = Rating.new(user_id: current_user.id,
                         book_id: params[:book_id],
                         rating: params[:rating])
    @rating.save
    render json: @rating
  end

  def destroy
    @rating = Rating.where(book_id: rating_params[:book_id])
                    .where(user_id: current_user.id)[0]
    @rating.destroy! if @rating
    render json: @rating
  end

private
  def rating_params
    params.require(:rating).permit(:rating, :book_id)
  end

end
