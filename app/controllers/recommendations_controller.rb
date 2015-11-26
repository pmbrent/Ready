class RecommendationsController < ApplicationController


  def create
    # Refactor to allow useres to send other users recommendations

    # Dismissals always override existing recommendations
    @recommendation = Recommendation.where(user_id: current_user.id)
                                    .where(book_id: rec_params[:book_id])[0]
    if !!@recommendation
      @recommendation.rejected = to_bool(rec_params[:rejected])
    else
      @recommendation = Recommendation.new(user_id: current_user.id,
                                           book_id: rec_params[:book_id],
                                           rejected: rec_params[:rejected] || false)
    end
    if @recommendation.save
      render json: @recommendation
    else
      render json: {}
    end
  end

  def show
    @recommendations = reqs_with_books
    unless @recommendations
      Recommendation.generate_recs_for_user_id(params[:id])
      @recommendations = reqs_with_books
    end

    render json: @recommendations
  end

  def reqs_with_books
    Recommendation.joins(:book)
      .where(recommendations: { user_id: current_user.id, rejected: false })
      .select('recommendations.id, recommendations.book_id,
              recommendations.rejected, recommendations.created_at,
              books.title, books.isbn,
              books.author, books.description')
  end

private

  # Refactor to allow users to send other users recommendations
  def rec_params
    params.require(:rec).permit(:book_id, :rejected)
  end

  def to_bool(str)
    str == "true"
  end
end
