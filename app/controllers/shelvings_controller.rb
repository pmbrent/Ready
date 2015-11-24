class ShelvingsController < ApplicationController

  def create
    @shelving = Shelving.new(shelving_params)
    @shelving.save!
    render json: @shelving
  end

  def destroy
    @shelving = Shelving.where(book_id: shelving_params[:book_id])
                        .where(shelf_id: shelving_params[:shelf_id])[0]
    if @shelving
      @shelving.destroy!
    end
    render json: @shelving
  end

private
  def shelving_params
    params.require(:shelving).permit(:book_id, :shelf_id)
  end
end
