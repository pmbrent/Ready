class BooksController < ApplicationController

  def index
    @books = Book.all_with_ratings(current_user.id)
    render json: @books
  end

  def show
    @book = Book.find(params[:id])
    render json: @book
  end

end
