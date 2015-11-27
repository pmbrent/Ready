class RatingsController < ApplicationController

  def create
    @rating = Rating.where(user_id: current_user.id)
                    .where(book_id: rating_params[:book_id])[0]
    if @rating
      @rating.rating = rating_params[:rating].to_i
    else
      @rating = Rating.new(user_id: current_user.id,
                           book_id: rating_params[:book_id],
                           rating: rating_params[:rating])
    end
    if @rating.save
      @recommendation = Recommendation.where(user_id: current_user.id)
                                      .where(book_id: rating_params[:book_id])[0]
      @recommendation && @recommendation.destroy

      Book.find(rating_params[:book_id]).calc_avg_rating
    end
    render json: @rating
  end

  def destroy
    @rating = Rating.where(book_id: rating_params[:book_id])
                    .where(user_id: current_user.id)[0]
    if @rating
      @rating.destroy!
      Book.find(rating_params[:book_id]).calc_avg_rating
    end
    render json: @rating
  end

private
  def rating_params
    params.require(:rating).permit(:rating, :book_id)
  end

end
