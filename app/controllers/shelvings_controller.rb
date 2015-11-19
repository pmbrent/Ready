class ShelvingsController < ApplicationController

  def create
    @shelving = Shelving.new(shelving_params)
    @shelving.save!
    render json: @shelving
  end

  def destroy
    ## REFACTOR
  end

private
  def shelving_params
    params.require(:shelving).permit(:book_id, :shelf_id)
  end
end
