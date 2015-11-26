class BooksController < ApplicationController

  def index
    @books = Book.all_with_ratings(current_user.id)
    render json: @books
  end

  def show
    @book = Book.find(params[:id])
    render json: @book
  end

  def search
    @books = Book.search_by_info(params[:query]).page(params[:page])
    render json: @books
  end

end
