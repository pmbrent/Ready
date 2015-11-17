class ShelvesController < ApplicationController

  def index
    @shelves = Shelf.all
    render json: @shelves
  end

end
