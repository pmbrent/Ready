class RecommendationsController < ApplicationController

  def show
    @recommendations = Recommendation.where(user_id: params[:id])
    unless @recommendations
      Recommendation.generate_recs_for_user_id(params[:id])
      @recommendations = Recommendation.where(user_id: params[:id])
    end

    render json: @recommendations
  end

end
