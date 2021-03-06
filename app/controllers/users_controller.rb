class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      @user.make_default_shelves
      log_in(@user)
      render json: current_user, only: [:id, :name, :email]
    else
      render json: {errors: ["Invalid information."], status: 401}
    end
  end

  def index
    @users = User.all
    render json: @users
  end

  def show
    @user = User.find(params[:id])
    render json: @user.as_json(only: [:id, :name, :email],
                                include: {
                                  shelves: {
                                    include: {
                                      books: {only: [:title, :id, :isbn]}
                                    }
                                  }, friends: {only: :id}
                                })
  end

  def feed
    if current_user
      @user = current_user
    else
      @user = User.new
    end
    render json: @user.get_feed
  end

  def search
    @users = User.search_by_info(params[:query]).page(params[:page])
    render json: @users
  end

private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
