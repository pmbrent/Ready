class UsersController < ApplicationController

  def new
    @user = User.new
  end

  def create
    @user = User.create(user_params)
    if @user.save
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
    # fix with JBuilder
    render json: @user.as_json(include: {
                                  shelves: {
                                    include: {
                                      books: {only: [:title, :id, :isbn]}
                                    }
                                  }
                                })
  end

private
  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
