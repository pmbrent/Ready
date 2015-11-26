class RecommendationsController < ApplicationController

  def show
    @recommendations = reqs_with_books
    unless @recommendations
      Recommendation.generate_recs_for_user_id(params[:id])
      @recommendations = reqs_with_books
    end

    render json: @recommendations
  end

  def reqs_with_books
    Recommendation.joins(:book).where(recommendations: { user_id: 1 })
      .select('recommendations.id, recommendations.book_id,
              recommendations.rejected, recommendations.created_at,
              books.title, books.isbn,
              books.author, books.description')
  end

end
