class ShelvesController < ApplicationController

  def index
    @shelves = Shelf.all
    render json: @shelves
  end

  def show
    @shelf = Shelf.find(params[:id])
    render json: @shelf
  end

end
